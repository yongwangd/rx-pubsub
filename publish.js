// Imports the Google Cloud client library
const PubSub = require('@google-cloud/pubsub');

// Your Google Cloud Platform project ID
const projectId = 'rx-pubsub';

// Instantiates a client
const pubsubClient = new PubSub({
  projectId: projectId
});

// The name for the new topic
const topicName = 'universe';

// Creates the new topic
pubsubClient
  .createTopic(topicName)
  .then(results => {
    const topic = results[0];
    console.log(`Topic ${topic.name} created.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
