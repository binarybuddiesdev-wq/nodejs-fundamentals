# Streams in Node.js 🌊

## What is a Stream?

A **Stream** is a way to process data **piece by piece (in chunks)** instead of loading the **entire data into memory at once**.

Streams are especially useful when working with **large files** or **continuous data**.

---

## Why Streams are Important

### Use Case Example 📦

Let’s say we need to read a **2GB file**.

### ❌ Without Streams

- Node.js tries to load the entire file into RAM
- Memory usage spikes 📈
- Application may slow down or crash 💥

### ✅ With Streams

- File is read in **small chunks**
- Each chunk is processed immediately
- Memory usage stays low 🧠
- Fast and scalable ⚡

---

## What Streams Are Really About

Streams focus on:

- 🚀 Performance
- 🧠 Memory efficiency
- 🔄 Handling large or continuous data

> **Streams let us start working with data before all of it is available.**

---

## Where Are Streams Used?

---

## 1️⃣ File Handling 📁

- Reading and writing files
- Working with video/audio files

### Examples:

- Downloading a file
- Uploading a file
- Copying files
- Streaming large media files

---

## 2️⃣ Network & HTTP 🌐

- Incoming HTTP requests
- Sending responses **chunk by chunk**

### Examples:

- API receiving a large JSON payload
- Sending a video file to the browser
- Live data:
  - Chat applications
  - Notifications

> **`req` and `res` objects in Express are streams.**

---

## 3️⃣ Data Processing 🔧

- Compressing files
- Encrypting / decrypting data
- Parsing CSV or JSON **line by line**

### Example:

Read file → compress → save (without loading whole file)

✔️ All without loading the entire file into memory

---

## 4️⃣ Real-Time Systems ⏱️

- Video streaming
- Audio streaming
- Log processing
- WebSockets

---

## Types of Streams in Node.js

Node.js provides **4 different types of streams**:

### 1️⃣ Readable Stream

- Data flows **from a source to your application**
- Example:
  - Reading a file
  - Incoming HTTP request

---

### 2️⃣ Writable Stream

- Data flows **from your application to a destination**
- Example:
  - Writing to a file
  - Sending HTTP response

---

### 3️⃣ Duplex Stream

- Data flows **both ways** (read + write)
- Example:
  - TCP sockets
  - WebSockets

---

### 4️⃣ Transform Stream

- Data is **read, modified, then written**
- Example:
  - Compression
  - Encryption
  - Data transformation

---

## Summary ✨

- Streams process data **incrementally**
- They reduce memory usage
- They improve performance
- Essential for large files and real-time applications

Streams are one of the **most powerful features of Node.js**.

---
