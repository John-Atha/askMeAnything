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

async function redirect(req, res){
  //console.log(req);
  const url = req.query.url;
  console.log(url);
  if (url.startsWith(urls.questManUrl)) {
    //const result = await axios.get(questManUrl, { url, method: 'get' }); 
    const params = { url, method: 'get' }
    axios.get(urls.questManUrl, { params })
    .then(response => {
      const { exists, needsAuth } = response.data;
      console.log(response.data);
      if (!exists) res.status(404).send('Service not found.');
      if (!needsAuth) {
        axios.get(url, { params: req.query })
        .then(response => {
          console.log(response.data);
          res.send(response.data);
        })
        .catch(err => {
          //console.log(err);
          res.status(400).send('Could not get data from service');
        })
      }
      else {
        return res.status(401).send('Needs authorization.');
      }  
    })
    .catch(err => {
      console.log(err);
      return res.status(400).send('Service unavailable');
    })
  }
  else {
    return res.status(400).send('Bad request');
  }
}

app.get('/', (req, res) => {
  return redirect(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});