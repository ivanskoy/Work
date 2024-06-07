const express = require('express')
const app = express()
const port = 3000
const rabbit = require('./src/rabbitmq')
const util = require('./src/util')
const uuid = require('uuid');

app.get('/', (req, res) => {
    const data = Buffer.alloc(200).map(() => util.random(0, 255))
    const correlationId = uuid.v4()
    const msgProperties = {
        correlationId,
        replyTo: 'amq.rabbitmq.reply-to'
    }
    // const data =  JSON.stringify(dataObject)

    console.log(data)

    rabbit.sendMessage(data, msgProperties)

    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

    // setInterval(() => {
    //     rabbit.sendMessage(`${Date.now()} message`)
    // }, 750)


})