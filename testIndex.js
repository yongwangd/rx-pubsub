const { cloudPublisher, cloudSubscriber } = require('./index');

// let sub = cloudSubscriber('rx-pubsub', 'gpc-mac').subscribe(message =>
//   console.log(message)
// );

cloudSubscriber('rx-pubsub', 'gpc-mac')
  .newMessages()
  .subscribe(message => console.log('new message', message));

cloudSubscriber('rx-pubsub', 'intel-nuc')
  .allMessages()
  .subscribe(message => console.log('ALL', message));

// cloudPublisher('rx-pubsub').publish('universe', {
//   hello: 'will this scale, yes it test again-----willl---'
// });
