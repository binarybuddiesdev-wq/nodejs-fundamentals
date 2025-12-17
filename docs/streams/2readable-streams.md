# Readable Streams in Node.js 📥

## What is a Readable Stream?

A **Readable Stream** is a stream from which your program **reads data chunk by chunk**.

- Data flows **into** your program
- Data is not loaded all at once into memory

---

## Real-World Use Cases of Readable Streams 🌍

Readable streams are commonly used when data is **coming into** the application.

### Examples:

- Reading a file
- Incoming HTTP request
- Reading data from a socket
- Reading `stdin` (keyboard input)

### Practical Examples:

- Reading a large `.txt` or `.log` file
- Receiving file upload from frontend
- Streaming a video file

---

## Events & Methods

A **Readable Stream** communicates with us using **events**, and we control its behavior using **methods**.

---

## Events 📢

There are **4 different events** available in Readable Streams.

---

### 1️⃣ `data`

- Triggered whenever a **chunk of data** is available
- Can be triggered **multiple times**
- Each trigger provides a new chunk of data

---

### 2️⃣ `end`

- Triggered when **no more data** is left
- Triggered **only once**
- Always comes **at the end**

---

### 3️⃣ `error`

- Triggered when **something goes wrong**
- Examples:
  - File not found
  - Permission denied
  - Stream closed unexpectedly

---

### 4️⃣ `close`

- Triggered when the stream is **fully closed**
- Can occur:
  - After the `end` event
  - Or after the `error` event

---

## Methods 🛠️

Methods are the **actions** we can perform based on the events triggered.

---

### 1️⃣ `.read()`

- Manually reads data from the stream
- Mostly used in **paused mode**

---

### 2️⃣ `.pause()`

- Stops emitting `data` events
- Data flow **temporarily stops**

---

### 3️⃣ `.resume()`

- Restarts data flow after `.pause()`
- `data` events continue again

---

### 4️⃣ `.pipe(destination)`

- Connects a readable stream to a writable stream
- Whatever we read is **automatically written** to the destination

---

### 5️⃣ `.unpipe()`

- Disconnects a piped destination from the readable stream

---

## Instructions 🧪

- A dummy file for reading data is present in the `utils-testing/streams` folder
- which generates some huge dummy content which can be used for readable stream and we can increase the no of records if we want
- Run the Python file to generate large dummy data:

```bash
python generate_big_file.py
```
