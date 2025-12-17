# 🔁 Duplex Streams in Node.js

## What is a Duplex Stream?

➡️ **A Duplex Stream** is a stream that supports **both reading and writing operations at the same time**.

You can think of it as a combination of:

- 📥 Readable Stream
- 📤 Writable Stream

Both sides operate **independently**.

---

## 🚀 Common Use Cases

Duplex streams are used when **two-way communication** is required:

- 🌐 TCP sockets (`net.Socket`)
- 🔄 WebSockets
- 🔐 SSH connections
- 🗄️ Database connections
- 🧩 IPC (Inter-Process Communication) channels

---

## 🔧 Real-World Example

- Client sends data ⬆️
- Server responds back ⬇️
- Both sides remain **active at the same time**

This simultaneous read–write behavior is exactly what duplex streams are designed for.

---

## 📡 Events

➡️ A Duplex stream has **all events of both streams**:

- ✅ All **Readable stream events** (`data`, `end`, `readable`, `error`, etc.)
- ✅ All **Writable stream events** (`finish`, `drain`, `close`, `error`, etc.)

Each side (read & write) manages its lifecycle independently.

---

## 🧠 Duplex Stream Mental Model

```text
        Readable Side
             ↑
             │
      ┌─────────────┐
      │   DUPLEX    │
      └─────────────┘
             │
             ↓
        Writable Side
```

---

## 🧩 Key Points to Remember

- Duplex streams **read and write simultaneously**
- Read and write flows are **separate and independent**
- Backpressure can exist **independently** on each side
- Commonly used for **network-based and interactive systems**

---

✅ Duplex streams form the foundation of **bidirectional communication** in Node.js.
