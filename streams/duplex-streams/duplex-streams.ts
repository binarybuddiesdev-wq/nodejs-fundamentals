import net from 'node:net';

const server = net.createServer();

server.on('connection', (socket) => {
    console.log("Client connected");

    socket.on('data', (chunk) => {
        console.log("Received:", chunk.toString());
        socket.write(`Echo: ${chunk}`);
    });

    socket.on("end", () => {
        console.log("Client disconnected");
    });

    socket.on("error", (err) => {
        console.error("Socket error:", err.message);
    });

});

server.on("listening", () => {
    console.log("Server is listening");
});

server.on("error", (err) => {
    console.error("Server error:", err.message);
});

server.listen(54321);

// to run this we need to have 2 terminals
// in one terminal run this file -> command -> npx tsx duplex-streams.ts
// the other u need is git bash terminal -> command -> telnet localhost portNumber
// if it throws and error like bash: telnet: command not found
// press windows key -> search for Turn Windows features on or off -> Find Telnet Client -> check it -> close and reopen the bash terminal 