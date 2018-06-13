// Imports the Google Cloud client library
const PubSub = require('@google-cloud/pubsub');
const { Subject, Observable } = require('rxjs/Rx');

const cloudPublisher = (projectId, secret) => {
  const pubsubClient = new PubSub({
    projectId
  });

  const createTopic = topicName => pubsubClient.createTopic(topicName);
  const publish = (topName, data) => {
    const dataBuffer = Buffer.from(
      typeof data == 'string' ? data : JSON.stringify(data)
    );

    return pubsubClient
      .topic(topicName)
      .publisher()
      .publish(dataBuffer);
  };

  return {
    createTopic,
    publish
  };
};

const cloudSubscriber = (projectId, secret) => {
  const pubsubClient = new PubSub({
    projectId
  });

  const onTopic = name => {
    const subscription = pubsubClient.subscription(name);
    return Observable.fromEvent(subscription, 'message');
  };

  return {
    onTopic
  };
};

module.exports.cloudPublisher = cloudPublisher;
module.exports.cloudSubscriber = cloudSubscriber;

// Your Google Cloud Platform project ID
// const projectId = 'rx-pubsub';

// // Instantiates a client
// const pubsubClient = new PubSub({
//   projectId: projectId
// });

// // The name for the new topic
// const topicName = 'universe';

// // Creates the new topic
// pubsubClient
//   .createTopic(topicName)
//   .then(results => {
//     const topic = results[0];
//     console.log(`Topic ${topic.name} created.`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });
