const amqplib = require('amqplib')
const requestsQueue = 'tasks'
const responsesQueue = 'amq.rabbitmq.reply-to'

class RabbitMQ {
    constructor() {
        if (RabbitMQ.exists) {
            return RabbitMQ.instanse
        }

        RabbitMQ.instanse = this
        RabbitMQ.exists = true

        this.rabbit = amqplib
    }

    sendMessage = async (msg) => {
        const connection = await this.rabbit.connect('amqp://localhost')
        const channel = await connection.createChannel()

        // await channel.assertQueue(responsesQueue)

        channel.sendToQueue(responsesQueue, msg)
        channel.close()
    }

    consumeMessages = async () => {
        const connection = await this.rabbit.connect('amqp://localhost')
        const channel = await connection.createChannel()

        // await channel.assertQueue(responsesQueue)

        channel.consume(requestsQueue, (msg) => {
            if (msg !== null) {
                const data = msg.content.toString()
                console.log('Received:', msg);
                // channel.ack(msg);
            } else {
                console.log('Consumer cancelled by server');
            }
        }, {noAck: true})
    }
}

module.exports = new RabbitMQ()