const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
//const redis = require('redis');

const app = express();
const port = 3007;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const REDIS_PORT = 6379;
const REDIS_HOST = 'localhost';
const TotalConnections = 20

const urls = {
  questManUrl: "http://localhost:3001",
  authUrl: "http://localhost:3002",
  questRunUrl: "http://localhost:3003",
  analsUrl: "http://localhost:3004",
  statsUrl: "http://localhost:3005",
  frontUrl: "http://localhost:3000",
}

const pool = require('redis-connection-pool')('myRedisPool', {
  host: REDIS_HOST,
  port: REDIS_PORT,
  max_clients: TotalConnections,
  perform_checks: false,
  database: 0,
});
console.log('connected to redis');

const getToken = (req) => {
  const headers = req['rawHeaders'];
  let token = '';
  headers.forEach((header) => {
    if (header.startsWith('Bearer')) {
      token = header.slice(7);
    }
  });
  //console.log(`token: ${token}`);
  return token;
}

/* function to detect the target service from the request URL query param */
const findService = (url) => {
  let dst = null;
  if (url.startsWith(urls.questManUrl)) {
    dst = urls.questManUrl;
  }
  else if (url.startsWith(urls.questRunUrl)) {
    dst = urls.questRunUrl;
  }
  else if (url.startsWith(urls.analsUrl)) {
    dst = urls.analsUrl;
  }
  else if (url.startsWith(urls.statsUrl)) {
    dst = urls.statsUrl;
  }
  else if (url.startsWith(urls.authUrl)) {
    dst = urls.authUrl;
  }
  return dst;
}

/* function to forward the requests from the esb to the services */
async function sendResponse(method, url, req, res) {
  const token = getToken(req);
  const headers = {
    "Authorization": token ? ("Bearer "+ token) : 'dummy',
  };
  console.log(`${method} to ${url} with token ${token}`);
  if (method === 'get') {
    axios.get(url, { params: req.query, headers })
    .then(response => {
      console.log('Sent response.');
      res.send(response.data);
    })
    .catch(err => {
      console.log('Sent error.');
      res.send(err.response.data);
    })
  }
  else if (method === 'post' || method === 'patch') {
    const body = req.body;
    const func = method==='post' ? axios.post : axios.patch;
    //console.log(body);
    func(url, body, { headers })
    .then(response => {
      console.log('Sent response.');
      res.send(response.data);
    })
    .catch(err => {
      console.log('Sent error.');
      //console.log(err);
      res.send(err.response.data);
    })
  }
  else /*if (method === 'delete') */ {
    axios.delete(url, { headers })
    .then(response => {
      console.log('Sent response.');
      res.send(response.data);
    })
    .catch(err => {
      console.log('Sent error.');
      res.send(err.response.data);
    })
  }
}

/* main function to receive the requests  */
async function requestProcess(req, method, res) {

  /* validate target service */
  const url = req.query.url;
  console.log('---------------------------------');
  //console.log(`asked url: ${url}`);
  const dstService = findService(url);
  //console.log(`Dst service: ${dstService}`);
  if (!dstService) return res.status(404).send('Service not found.');

  /* add message to queue and forward to target service */
  pool.hget('bus', 'messages', async (err, data) => {
    const currMessages = JSON.parse(data) || [];
    //console.log('Current messages of the queue:');
    //console.log(currMessages);
    const newMessage = {
      id: currMessages ? currMessages.length+1 : 1,
      req: {
        query: req.query,
        headers: req.headers,
        body: req.body,
      },
      timestamp: Date.now(),
      targetService: dstService,
    };
    console.log('New message:')
    console.log({
      id: newMessage.id,
      req: {
        query: newMessage.req.query,
        body: newMessage.req.body,
      },
      timestamp: newMessage.timestamp,
      targetService: newMessage.targetService,
    })
    //console.log(newMessage);
    currMessages.push(newMessage);
    console.log('I pushed the new message.');
    pool.hset('bus', 'messages', JSON.stringify(currMessages), () => {
      pool.hget('channel', 'subscribers', (err, data) => {
        const subscribers = JSON.parse(data);
        let targetIsActive = false;
        for (let i=0; i<subscribers.length; i++) {
          if (subscribers[i] === (newMessage.targetService)) {
            targetIsActive = true;
          }
        }
        if (!targetIsActive) {
          return res.status(400).send('Target service is not subscribed.');
        }
        /* validate endpoint from service description */
        const explore_params = { url, method };
        axios.get(newMessage.targetService, { params: explore_params })
        .then(response => {
          const { exists, needsAuth } = response.data;
          console.log(response.data);
          if (!exists) res.status(404).send('Service\'s endpoint not found.');
          sendResponse(method, url, req, res);
        })
        .catch(err => {
          console.log(err.response);
          return res.status(400).send('Service unavailable');
        })
      })
    })
  })
}

app.get('/', (req, res) => {
  return requestProcess(req, 'get', res);
});

app.post('/', (req, res) => {
  return requestProcess(req, 'post', res);
});

app.delete('/', (req, res) => {
  return requestProcess(req, 'delete', res);
});

app.patch('/', (req, res) => {
  return requestProcess(req, 'patch', res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});