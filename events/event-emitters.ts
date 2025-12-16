// custom events
import events from 'node:events';

let myEmitter = new events.EventEmitter();

myEmitter.on('userEventEmitted', (date, name, place) => {
    console.log(`${name} is Born In ${place} On ${date}`);
});

myEmitter.emit('userEventEmitted', '2-SEP-1972', 'KALYAN BABU 💖', 'Bapatla');
