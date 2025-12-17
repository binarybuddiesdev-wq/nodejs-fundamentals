# 📝 Writable Streams in Node.js

## What is a Writable Stream?

➡️ **A Writable Stream** is a stream that is used to **write data chunk by chunk** to some destination.

You don’t load everything into memory at once. Instead, data flows gradually, making it efficient and scalable.

---

## 🚀 Common Use Cases

Writable streams are commonly used when you need to continuously write data:

- 📁 Write data to a file
- 🌐 Send HTTP responses
- ⬆️ Save uploaded files
- 📜 Write logs continuously
- 🔁 Pipe data from another stream

---

## 🔧 Common Writable Stream Examples

- `fs.createWriteStream()`
- `res` object in Express
- `process.stdout`

---

## 📡 Events

Writable streams emit several important events during their lifecycle.

### 1️⃣ `finish`

- Triggered **once all data has been written successfully**.
- Fired **only once**, at the very end.
- Indicates that `.end()` has been called and all buffered data is flushed.

---

### 2️⃣ `error`

- Triggered when an **error is encountered** during writing.

**Examples:**
- 💽 Disk full / memory full
- 🚫 Permission denied
- 🔌 Broken pipe

---

### 3️⃣ `close`

- Triggered when the stream is **completely closed**.
- Can occur **after `finish` or after `error`**.
- Indicates that the underlying resource (like a file descriptor) is closed.

---

### 4️⃣ `drain`

- Triggered when the **internal buffer becomes empty after being full**.
- Signals that it’s safe to resume writing data.

---

## 🛠️ Methods

### 1️⃣ `.write(chunk)`

- Writes a chunk of data to the destination.

```js
const canWriteMore = writable.write(chunk);
```

- Returns a **boolean value**:
  - `true` → Buffer not full, keep writing
  - `false` → Buffer full, stop writing and wait for `drain`

---

### 2️⃣ `.end([chunk])`

- Writes an optional **last chunk** of data.
- Signals that **no more data will be written** after this.
- Required to properly close the writable stream.

---

### 3️⃣ `.destroy(error?)`

- Immediately stops writing and closes the stream.
- Used for **abort scenarios or fatal errors**.
- Optionally accepts an error object.

---

### 4️⃣ `.setDefaultEncoding(encoding)`

- Optional method.
- Sets the **default encoding** for string writes.

---

### 5️⃣ `.cork()` and `.uncork()`

- Temporarily **buffers multiple `.write()` calls**.
- Flushes them together when `.uncork()` is called.
- Mainly used for **performance optimization**.

---

## 🚦 Backpressure

### What is Backpressure?

- Occurs when data is written **faster than the destination can handle**.
- Writable streams protect memory by:
  - Returning `false` from `.write(chunk)`
  - Emitting a `drain` event once memory is available

---

### 🔄 Backpressure Flow

```text
write() → false
   ↓
wait for 'drain'
   ↓
write() again
```

---

## 🧠 Simple Mental Model

```text
Your Code  ───▶  Writable Stream  ───▶  Destination
                   ↑
             Backpressure Control
```

---

## ⏱️ Full Mental Timeline

```text
write()
 ↓
buffer fills
 ↓
write() → false
 ↓
wait
 ↓
drain
 ↓
write()
 ↓
end()
 ↓
finish
 ↓
close
```

---

✅ This lifecycle ensures **efficient memory usage**, **controlled data flow**, and **safe resource handling** when writing data in Node.js.

