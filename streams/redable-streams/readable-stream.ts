import fs from 'node:fs';

// to see the ral chunk reduce the size of highWaterMark to 10 as of now it's 16kb which is default
// if we want default behavior we can remove that property as well 
const readableStream = fs.createReadStream('../../utils-testing/streams/huge_data.json', { highWaterMark: 16 * 1024 });
const writableStream = fs.createWriteStream('./../data-output/pipe-output.txt');

let chunkCount = 0;

readableStream.on('data', (chunk) => {
    // console.log("Chunk:", chunk); -> this gives u the buffer, if u want to see the actual data convert it to string 

    // console.log("---- CHUNK START ----");
    // console.log('chunk : ', chunk.toString());
    // console.log("---- CHUNK END ----");

    chunkCount++;

    console.log(`\n[DATA] Chunk #${chunkCount} received`);
    console.log("Chunk content:", JSON.stringify(chunk.toString()));

    console.log("[ACTION] Pausing stream...");
    readableStream.pause();

    setTimeout(() => {
        console.log("[ACTION] Resuming stream...");
        readableStream.resume();
    }, 5000);
});


readableStream.on('end', () => {
    console.log("Reading completed");
});

readableStream.on("error", (err) => {
    console.error("Error:", err.message);
});

readableStream.on("close", () => {
    console.log("Stream closed");
});


readableStream.pipe(writableStream);


setTimeout(() => {
    console.log("Unpiping now");
    readableStream.unpipe(writableStream);
}, 1500);


// usage of readable-stream methods


// readable tells you data is ready,
// .read() lets you take it,
// loop drains everything available right now.

// readableStream.on("readable", () => {
//     let chunk;
//     while (null !== (chunk = readableStream.read())) {
//         console.log(chunk.toString());
//     }
// });


// readableStream.on("data", (chunk) => {
//     readableStream.pause();

//     setTimeout(() => {
//         readableStream.resume();
//     }, 1000);
// });


