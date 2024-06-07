const amqplib = require('amqplib')
const { repliesQueue, requestsQueue } = require('./constants')
const util = require('./util')


class RabbitMQ {
    constructor() {
        if (RabbitMQ.exists) {
            return RabbitMQ.instanse
        }

        RabbitMQ.instanse = this
        RabbitMQ.exists = true

        this.rebbit = amqplib
    }

    sendWithReply = async (toSendQueue, data, correlationId, response) =>  {
        try {
            const preparedData = data instanceof Buffer ? data : Buffer.from(data)
            const connection = await this.rebbit.connect('amqp://localhost')

            const channel = await connection.createChannel()
            const assertedQueue = await channel.assertQueue('', {
                exclusive: true
            })

            channel.consume(assertedQueue.queue, (msg) => {
                if(msg.properties.correlationId == correlationId) {
                    const { publicKey, signature } = JSON.parse(msg.content.toString())

                    if (util.verifySignature(preparedData, Buffer.from(signature), publicKey)) {
                        response.send({
                            message: "signature is correct",
                            signature: Buffer.from(signature).toString('base64')
                        })
                    } else {
                        response.send({
                            message: "something wrong",
                        })
                    }

                    setTimeout(function() {
                        connection.close();
                        // process.exit(0)
                      }, 500);
                }
            }, {
                noAck: true
            })

            channel.sendToQueue(toSendQueue, preparedData, {
                correlationId,
                replyTo: assertedQueue.queue
            })
        } catch (err) {
            console.log("Упс")
        }
    }
}
module.exports = new RabbitMQ()