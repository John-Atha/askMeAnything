const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
const redis = require('redis');

const app = express()
const port = 3007
app.use(bodyParser.json())


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
async function send_without_auth(method, url, req, res) {
  if (method === 'get') {
    axios.get(url, { params: req.query })
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
    func(url, body)
    .then(response => {
      console.log('Sent response.');
      res.send(response.data);
    })
    .catch(err => {
      console.log('Sent error.');
      res.send(err.response.data);
    })
  }
  else /*if (method === 'delete') */ {
    axios.delete(url)
    .then(response => {
      console.log('Sent response.');
      res.send(response.data);
    })
    .catch(err => {
      console.log('Sent error.');
      res.send(err.response.data);
    })
  }}

/* main function to receive the requests  */
async function req_send(req, method, res) {
  
  /* detect target service */
  const url = req.query.url;
  console.log('-------------');
  console.log(`asked url: ${url}`);
  const dstService = findService(url);
  console.log(`Dst service: ${dstService}`);
  if (!dstService) return res.status(404).send('Service not found.');
  
  /* validate endpoint from service description */
  const explore_params = { url, method };
  if (dstService!==urls.authUrl) {
    axios.get(dstService, { params: explore_params })
    .then(response => {
      const { exists, needsAuth } = response.data;
      console.log(response.data);
      if (!exists) res.status(404).send('Service not found.');
      /* if endpoint exists  */
      if (!needsAuth) {
        /* if no auth is needed, forward the request */
        console.log('No need for auth.');
        send_without_auth(method, url, req, res);
      }
      else {
        /* if auth is needed, forward the request to the auth component to retrieve request_user_id */

        /* unauthorized -> return error  */

        /* authorized -> add request_user_id to request header and forward it to the target service  */

        return res.status(401).send('Needs authorization.');
      }  
    })
    .catch(err => {
      console.log(err.response);
      return res.status(400).send('Service unavailable');
    })
  }
  else {
    console.log('No need for auth.');
    send_without_auth(method, url, req, res);
  }
}

app.get('/', (req, res) => {
  return req_send(req, 'get', res);
});

app.post('/', (req, res) => {
  return req_send(req, 'post', res);
});

app.delete('/', (req, res) => {
  return req_send(req, 'delete', res);
});

app.patch('/', (req, res) => {
  return req_send(req, 'patch', res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});