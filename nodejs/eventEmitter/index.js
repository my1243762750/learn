const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    console.log('event1')
});
myEmitter.on('event', () => {
    console.log('event2')
});
myEmitter.emit('event');
