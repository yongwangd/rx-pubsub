// Imports the Google Cloud client library
const PubSub = require(`@google-cloud/pubsub`);

// Creates a client
const pubsub = new PubSub({
  projectId: 'rx-pubsub'
});

/**
 * TODO(developer): Uncomment the following lines to run the sample.
 */
const subscriptionName = 'gpc-mac';
const timeout = 600;

// References an existing subscription
const subscription = pubsub.subscription(subscriptionName);

// Create an event handler to handle messages
let messageCount = 0;
const messageHandler = message => {
  console.log(`Received message ${message.id}:`);
  console.log(`\tData: ${message.data}`);
  console.log(`\tAttributes: ${JSON.stringify(message.attributes)}`);
  messageCount += 1;

  // "Ack" (acknowledge receipt of) the message
  message.ack();
};

// Listen for new messages until timeout is hit
subscription.on(`message`, messageHandler);
subscription.on('error', error => console.error(error));
setTimeout(() => {
  subscription.removeListener('message', messageHandler);
  console.log(`${messageCount} message(s) received.`);
}, timeout * 1000);

// const { cloudPublisher, cloudSubscriber } = require('./index');

// let sub = cloudSubscriber('rx-pubsub', 'gpc-mac').subscribe(message =>
//   console.log(
//     'received message',
//     JSON.stringify(message),
//     message.data,
//     message.data.toString()
//   )
// );

// cloudPublisher('rx-pubsub').publish('universe', {
//   hello: 'will this scale, yes it test again-----willl---'
// });
