const PubSub = require('@google-cloud/pubsub');
const { Observable } = require('rxjs/Rx');

function getJSON(str) {
  let parsed = '';
  try {
    parsed = JSON.parse(str);
  } catch (e) {
    return str;
  }
  return parsed;
}

const cloudPublisher = (projectId, secret) => {
  const pubsubClient = new PubSub({
    projectId
  });

  const createTopic = topicName => pubsubClient.createTopic(topicName);
  const publish = (topicName, data) => {
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

const cloudSubscriber = (projectId, subscriptionName) => {
  const pubsubClient = new PubSub({
    projectId
  });
  const subscription = pubsubClient.subscription(subscriptionName);

  const message$ = Observable.fromEvent(subscription, 'message');

  const newMessages = () => {
    const now = Date.now();
    return message$
      .filter(msg => Date.parse(msg.publishTime) > now)
      .map(msg => {
        msg.ack();
        return getJSON(msg.data.toString());
      });
  };

  const allMessages = () =>
    message$.map(msg => {
      msg.ack();
      return getJSON(msg.data.toString());
    });
  return { newMessages, allMessages };
};

module.exports.cloudPublisher = cloudPublisher;
module.exports.cloudSubscriber = cloudSubscriber;
