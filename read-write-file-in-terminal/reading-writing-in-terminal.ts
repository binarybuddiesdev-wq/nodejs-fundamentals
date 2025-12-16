import * as readline from "node:readline";

const readLineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

readLineInterface.question("Please Enter Your Name: ", (userName) => {
    console.log('Username is ', userName);
    readLineInterface.close();
});

readLineInterface.on('close', () => {
    console.log('Interface Is Closed');
    process.exit(0);
});

