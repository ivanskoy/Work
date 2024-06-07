const amqplib = require('amqplib')
const util = require('./util')

class RabbitMQ {
    constructor() {
        if (RabbitMQ.exists) {
            return RabbitMQ.instanse
        }

        RabbitMQ.instanse = this
        RabbitMQ.exists = true

        this.connection = amqplib.connect('amqp://localhost')
    }

    consumeWithReply = async (consumeQueue) => {
        this.connection = await this.connection
        const channel = await this.connection.createChannel()
        
        channel.assertQueue(consumeQueue, {
            durable: false
        });
        channel.prefetch(1);

        channel.consume(consumeQueue, (msg) => {
            const data = util.generateSignature(msg.content)

            channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(data)), {
                correlationId: msg.properties.correlationId
            });
      
            channel.ack(msg);
          });
    }
}

module.exports = new RabbitMQ()