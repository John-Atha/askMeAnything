const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3013;
const corsOptions = {
    origin: [
        'http://localhost:3008',
        'http://localhost:3009',
        'http://localhost:3010',
        'http://localhost:3011',
        'http://localhost:3012'
    ],
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const REDIS_PORT = 6379;
const REDIS_HOST = 'localhost';
const TotalConnections = 20;

const urls = {
    authMicro: 'http://localhost:3008',
    questionsMicro: 'http://localhost:3009',
    answersMicro: 'http://localhost:3010',
    statsMicro: 'http://localhost:3011',
    analsMicro: 'http://localhost:3012',
};

const pool = require('redis-connection-pool')('myRedisPool', {
    host: REDIS_HOST,
    port: REDIS_PORT,
    max_clients: TotalConnections,
    perform_checks: false,
    database: 0,
});
console.log('connected to redis');

const validateBody = (body, res) => {
    if (!body.action || !body.object || !body.id || !body.src || !body.targetEntity) {
        return res.status(400).send('Compulsory body part missing.');
    }
}

async function requestProcess(req, res) {
    const body = req.body;
    validateBody(body, res);
    console.log('-----------------------');
    pool.hget('choreographer', 'messages', async (err, data) => {
        const currMessages = JSON.parse(data) || [];
        const newMessage = {
            id: currMessages ? currMessages.length+1 : 1,
            action: body.action,
            object: body.object,
            entryId: body.id,
            src: body.src,
            targetEntity: body.targetEntity,
            timestamp: Date.now(),
        };
        console.log('New message:');
        console.log(newMessage);
        currMessages.push(newMessage);
        console.log('I pushed the new message.');
        pool.hset('choreographer', 'messages', JSON.stringify(currMessages), () => {
            pool.hget('choreographer', 'subscribers', (err, data) => {
                const subscribers = JSON.parse(data) || [];
                for (let i=0; i<subscribers.length; i++) {
                    if (subscribers[i].startsWith(newMessage.src)) continue;
                    axios.post(`${subscribers[i]}/choreo`, newMessage)
                    .then(response => {
                        console.log(`->I sent the message to ${subscribers[i]}/choreo, and got response:`);
                        console.log(response.data);
                    })
                    .catch(err => {
                        console.log(`->I sent the message to ${subscribers[i]}/choreo, and got the error:`);
                        console.log(err.response.data);
                    })
                }
                return res.send('OK');
            })
        })
    })
}

app.get('/', cors(corsOptions), (req, res) => {
    res.status(200).send('Hello world, I am the choreographer.');
});

app.post('/choreo', cors(corsOptions), (req, res) => {
    return requestProcess(req, res);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});