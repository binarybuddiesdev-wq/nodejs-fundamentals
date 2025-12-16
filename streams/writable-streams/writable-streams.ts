import fs from 'node:fs';

const writableStream = fs.createWriteStream('../data-output/write-stream-output.txt', { highWaterMark: 16 });


writableStream.on('finish', () => {
    console.log("[EVENT] finish → all data written");
});

writableStream.on('error', (error) => {
    console.error("[EVENT] error →", error.message);
});

writableStream.on('close', () => {
    console.log("[EVENT] close → stream fully closed");
});

writableStream.on('drain', () => {
    console.log("[EVENT] drain → buffer empty, safe to write again");
});



let i = 1;

function writeData() {
    while (i <= 20) {
        const chunk = `Line ${i}\n`;
        console.log(`[ACTION] writing → ${chunk.trim()}`);

        const canContinue = writableStream.write(chunk);

        if (!canContinue) {
            console.log("[BACKPRESSURE] buffer full → waiting for drain");
            writableStream.once("drain", writeData);
            return;
        }

        i++;
    }

    console.log("[ACTION] calling end()");
    writableStream.end("Final line\n");
}

writeData();


