const express = require('express')
const app = express()
const port = 3000
const rabbit = require('./src/rabbitmq')
const util = require('./src/util')
const uuid = require('uuid');
const { requestsQueue, repliesQueue } = require('./src/constants')

app.get('/', (req, res) => {
    const data = Buffer.alloc(200).map(() => util.random(0, 255))
    const correlationId = uuid.v4()

    rabbit.sendWithReply(requestsQueue, data, correlationId, res)
    
    // res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})