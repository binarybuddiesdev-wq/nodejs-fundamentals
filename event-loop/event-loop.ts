import fs from 'node:fs';


console.log('started');

// stored in the 1st phase of event loop callback queue
setTimeout(() => {
    console.log('setTimeOut callback executed');
}, 0);

// stored in the 2nd phase of event loop callback queue
fs.readFile('input.txt', 'utf-8', (error, data) => {
    console.log('File Reading Completed');

    setTimeout(() => {
        console.log('setTimeOut callback executed Inside ReadFile');
    }, 0);

    setImmediate(() => {
        console.log('setImmediate callback executed Inside ReadFile');
    });

    process.nextTick(() => {
        console.log('process.nextTick callback executed');
    });

});

// stored in the 3rd phase of event loop callback queue
setImmediate(() => {
    console.log('setImmediate callback executed');
});

console.log('completed');