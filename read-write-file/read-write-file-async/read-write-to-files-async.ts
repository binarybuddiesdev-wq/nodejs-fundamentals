import fs from 'node:fs';

const filePathToRead = '../../read-write-file-in-terminal/reading-writing-in-terminal.ts';

fs.readFile(filePathToRead, 'utf-8', (error, data) => {
    if (error) {
        console.log('error : ', error);
    } else {
        console.log('content : ', data);
    }
});

console.log('Reading File....');


const contentToWrite = 'this content is written using the writeFile method from read-write-to-files-async.ts';
fs.writeFile('./input.txt', contentToWrite, () => {
    console.log('writeFile method is executed successfully');
});

