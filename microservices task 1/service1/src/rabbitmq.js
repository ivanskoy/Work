const amqplib = require('amqplib')
const queue = 'tasks'
const responsesQueue = 'responses'

class RabbitMQ {
    constructor() {
        if (RabbitMQ.exists) {
            return RabbitMQ.instanse
        }

        RabbitMQ.instanse = this
        RabbitMQ.exists = true

        this.rabbit = amqplib
    }

    sendMessage = async (msg, msgProperties) => {
        const connection = await this.rabbit.connect('amqp://localhost')
        const channel = await connection.createChannel()
        const data = msg instanceof Buffer ? msg : Buffer.from(msg)

        await channel.assertQueue(queue)

        const reault = channel.sendToQueue(queue, data, msgProperties)
        console.log(reault)
        channel.close()
    }

    consumeMessages = async () => {
        const connection = await this.rabbit.connect('amqp://localhost')
        const channel = await connection.createChannel()

        await channel.assertQueue(queue)

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log('Received:', msg.content.toString());
                channel.ack(msg);
            } else {
                console.log('Consumer cancelled by server');
            }
        })
    }
}

module.exports = new RabbitMQ()