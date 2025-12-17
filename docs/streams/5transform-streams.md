# 🔄 Transform Streams in Node.js

## What is a Transform Stream?

➡️ **A Transform Stream** is a stream that **reads data, modifies it, and then outputs the transformed data chunk by chunk**.

It sits **between a readable source and a writable destination**.

---

## 🧠 Mental Model

```text
Input Stream
     ↓
[  TRANSFORM  ]
     ↓
Output Stream
```

---

## 🔁 Transform vs Duplex (Important Difference)

- In a **Duplex stream**:

  - Read and write operations are **independent** of each other

- In a **Transform stream**:
  - The **output depends directly on the input**
  - Each written chunk is processed and then pushed as transformed output

➡️ So, every Transform stream **is a Duplex stream**, but with a strict relationship between input and output.

---

## 🚀 Common Use Cases

Transform streams are ideal when data needs to be **processed while streaming**:

- 🗜️ Compressing files (e.g., `gzip`)
- 🔐 Encrypting / decrypting data
- 🔁 Converting data formats (JSON → CSV)
- 🔠 Uppercasing / sanitizing logs
- ✅ Streaming validation
- 🌐 Modifying HTTP responses

---

## 🧩 `_flush()` Method

```js
_flush(callback) {
  // handle remaining data
  callback();
}
```

- `_flush()` is called **once**.
- It runs when the **input stream has no more data**.
- Used to handle any **remaining or incomplete buffered data**.
- Commonly needed when transformation logic depends on **multiple chunks**.

---

## 🧠 Key Points to Remember

- Transform streams **modify data in transit**
- Output is always derived from input
- Data flows **chunk by chunk**, not all at once
- `_flush()` ensures no data is left behind

---

✅ Transform streams enable **efficient, memory-safe, real-time data processing** in Node.js.
