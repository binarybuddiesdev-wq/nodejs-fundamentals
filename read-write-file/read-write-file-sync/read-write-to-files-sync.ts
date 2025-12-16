import fs from 'node:fs';

const filePathToRead = '../../read-write-file-in-terminal/reading-writing-in-terminal.ts';

const content = fs.readFileSync(filePathToRead, 'utf-8');
console.log('content : ', content);


const contentToWrite = 'this content is written using the writeFileSync method from read-write-to-files-sync.ts';
fs.writeFileSync('./input.txt', contentToWrite);