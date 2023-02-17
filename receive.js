const amqp = require('amqplib/callback_api');

const createClient = () => {
  /* 
    posso criar toda a logica de criar o cliente aqui 
    e executar dentro de channel.consume
  */
  console.log('oi')
}

amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    const queue = 'createClient';

    channel.assertQueue(queue, {
      durable: false
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, function (msg) {
      console.log(" [x] Received %s", msg.content.toString());
      createClient()
    }, {
      noAck: true
    });
  });
});