# Node.js Event Loop Explained

## What is Node.js?

**Node.js** is a **JavaScript runtime** that executes JavaScript **outside the browser** using:

- **V8 Engine** (JavaScript execution)
- **libuv** (asynchronous I/O and event loop)

Node.js allows JavaScript to run on servers and systems, not just browsers.

---

## Why Node.js is Special

Node.js is:

- **Single-threaded** (for JavaScript execution)
- **Non-blocking**
- **Asynchronous**
- **Highly scalable**

It can handle **thousands of concurrent requests** efficiently without creating a new thread for each request.

---

## What is the Event Loop?

The **Event Loop** is a mechanism that:

- Decides **when** callbacks are executed
- Decides **in which order** they are executed
- Enables **non-blocking asynchronous behavior**

### Simple Definition

> “While the program is running, keep checking for completed async work and execute callbacks.”

---

## Core Components Behind the Event Loop

There are **two major components** that power Node.js async behavior:

1. **V8 Engine**
2. **libuv**

---

## 1️⃣ V8 Engine

- Developed by **Google**
- Written in **C++**
- Converts JavaScript into **machine code**
- Executes JavaScript **very fast**

### Responsibilities of V8

- JavaScript execution
- Call Stack
- Heap (memory allocation)
- Garbage Collection

### Important Notes

- V8 **only understands JavaScript**
- It does **not** handle:
  - File system
  - Networking
  - Timers
- Node.js **embeds V8** so JavaScript can run outside the browser

---

## 2️⃣ libuv

- Written in **C**
- Acts as the **backbone of asynchronous operations**
- Makes Node.js **cross-platform**

### What libuv Handles

#### 1. Event Loop

- Runs continuously
- Manages multiple queues
- Pushes callbacks to V8’s call stack

#### 2. Asynchronous I/O

- File system operations
- Network sockets
- DNS lookups
- Timers

#### 3. Thread Pool

- Offloads **heavy or blocking tasks**
- Default size: **4 threads**
- Can be increased up to **1024**

Examples of tasks using the thread pool:

- File system (`fs`)
- Crypto
- Compression
- DNS (some cases)

#### 4. OS Abstraction

- Provides consistent behavior across:
  - Windows
  - macOS
  - Linux
- Hides OS-specific APIs

---

## How Node.js is Single-Threaded but Asynchronous

- JavaScript runs on **one main thread**
- Heavy or blocking work is delegated to:
  - OS
  - libuv thread pool
- Once completed, callbacks are queued
- Event Loop pushes them back to the call stack

---

## Event Loop Phases (Execution Order)

Each phase has its **own callback queue**.

```text
┌─────────────────────┐
│ Timers │ setTimeout, setInterval
├─────────────────────┤
│ Pending callbacks │ system callbacks
├─────────────────────┤
│ Idle / prepare │
├─────────────────────┤
│ Poll │ I/O events (fs, sockets)
├─────────────────────┤
│ Check │ setImmediate
├─────────────────────┤
│ Close callbacks │ socket.close()
└─────────────────────┘
```

- Each phase has its own queue.

### Key Phases Explained

- **Timers**  
  Executes callbacks scheduled by `setTimeout()` and `setInterval()`

- **Poll**

  - Retrieves new I/O events
  - Executes I/O-related callbacks
  - Determines how long to block waiting for events

- **Check**  
  Executes callbacks scheduled by `setImmediate()`

- **Close Callbacks**  
  Executes cleanup callbacks (e.g., socket close)

---

## Summary

- Node.js uses **V8** for JavaScript execution
- **libuv** handles async operations and the event loop
- Event Loop enables:
  - Non-blocking I/O
  - High concurrency
  - Efficient performance
- JavaScript remains **single-threaded**, but Node.js is **asynchronous**

---

## Learning Resources

- 📖 Event Loop Visualization  
  https://medium.com/@mmoshikoo/event-loop-in-nodejs-visualized-235867255e81

- 🎥 YouTube Playlist  
  https://www.youtube.com/watch?v=59C1dvLRIrI&list=PL1BztTYDF-QPdTvgsjf8HOwO4ZVl_LhxS&index=27  
  https://www.youtube.com/watch?v=5F4iO-W0ZbY&list=PL1BztTYDF-QPdTvgsjf8HOwO4ZVl_LhxS&index=28  
  https://www.youtube.com/watch?v=jxAXonX9Ao4&list=PL1BztTYDF-QPdTvgsjf8HOwO4ZVl_LhxS&index=29
