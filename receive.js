const amqp = require('amqplib/callback_api');
const PostgresUserRepository = require('./database/userRepository');

const userRepo = new PostgresUserRepository()

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
      const [id, email] = msg.content.toString().split(' ');

      (async () => {
        try {
          await userRepo.update(id, email)
        } catch (error) {
          console.log(error)
        }
      })()
    }, {
      noAck: true
    });
  });
});

process.on('uncaughtException', (error, origin) => {
  console.log(`${origin} signal received. \n${error}`)
})
