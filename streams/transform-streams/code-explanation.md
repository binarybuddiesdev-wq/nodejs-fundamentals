# 🧩 Custom Transform Stream – Filtering Large JSON Data

## What Are We Building?

➡️ We are creating a **custom Transform stream** tailored for our specific use case.

The goal is to **process a very large JSON file efficiently**, without loading the entire file into memory.

---

## 📁 Input Data Details

- The file name is `huge_data.json`
- Location: `utils-testing/streams` folder

If the file does not exist:

```bash
python generate_big_file.py
```

This script generates a large JSON file.

---

## 📄 JSON Structure & Requirement

- Each JSON object contains a property called `isActive`
- `isActive` can be either `true` or `false`

🎯 **Requirement:**

- Send only records where `isActive === true`
- Filter out all others

---

## ❌ Why We Cannot Use `.filter()`

- The data **is not an array in memory**
- Streams read data **chunk by chunk**, not all at once
- Even if the original file is an array, streaming breaks it into chunks

Each chunk size depends on `highWaterMark`.

For example, if `highWaterMark = 10`, a single JSON object can be split across **multiple chunks**.

---

## 🧠 Example of Chunked JSON Data

A single object may arrive like this:

```text
{"id": 1, "us
ername": "user_1
", "email": "u
ser_1@example.
com", "isActi
ve": fal
se, "creat
edAt": "2025-01-0
1T00:00:01Z"}
```

- Data arrives in **binary format**
- JSON objects are **broken into pieces**

So we must:

- Convert binary → string
- Rebuild the original JSON object
- Then apply filtering logic

---

## 🔄 What Does `_transform()` Do?

➡️ `_transform()` is called by Node.js **every time a new chunk arrives**.

You can think of it as Node.js saying:

> “Here is a piece of data. Do whatever you want with it, then tell me when you’re done.”

---

## 🧾 `_transform()` Syntax

```js
_transform(chunk, encoding, callback) {
  // process chunk
  callback();
}
```

⚠️ **Important:**

If `callback()` is NOT called:

- ❌ Stream freezes
- ❌ No more data flows

---

## 🧠 Problems `_transform()` Solves in _Our_ Case

- Data arrives as **binary chunks**
- Chunks may cut JSON objects in half
- We only want records where `isActive === true`

So `_transform()` must:

- 🔁 Convert binary → text
- 🧱 Rebuild complete JSON objects
- 🔍 Filter based on `isActive`
- 🚀 Send valid output downstream

---

## 🔧 Step-by-Step Logic Inside `_transform()`

### 1️⃣ Convert Binary to String

```js
chunk.toString();
```

- Converts binary data into readable text

---

### 2️⃣ Accumulate Leftover Data

- The converted string is appended to a buffer (`leftover`)
- This buffer holds incomplete data from previous chunks

---

### 3️⃣ Split by New Line

- Data is split using `\n`
- This converts the stream into an **array of lines**

---

### 4️⃣ Handle Incomplete JSON

- The **last line is removed** using `pop()`
- Reason: the last line may contain **incomplete JSON**

```js
this.buffer = lines.pop();
```

---

### 5️⃣ Parse, Filter, Push

- Loop over remaining lines
- Parse each line as JSON
- Check `isActive === true`
- If true → push downstream

```js
this.push(validData);
```

---

### 6️⃣ Signal Completion

- Call `callback()` to let Node.js continue processing

---

## 🧹 `_flush()` Method

➡️ `_flush()` is called **once**, when the input stream has ended.

It is used to process any **remaining leftover data**.

---

## ❓ Why `_flush()` Is REQUIRED

Recall this step:

```js
this.buffer = lines.pop();
```

- At the end of the file, **no more chunks arrive**
- But `this.buffer` may still contain a **complete JSON object**

❌ Without `_flush()`:

- The **last valid record will be lost**

---

## 🔁 What Happens Inside `_flush()`

- Works similar to `_transform()`
- Parses the remaining buffer
- Checks `isActive === true`
- Pushes valid data downstream
- Calls `callback()`

Once `_flush()` finishes, it signals that:

✅ **The entire transform process is complete**

---

## 🧠 Key Takeaways

- Streams never guarantee full objects per chunk
- `_transform()` handles **chunk-level processing**
- `_flush()` handles **end-of-stream leftovers**
- Together, they ensure **zero data loss**

---

✅ This approach enables **memory-efficient filtering of massive JSON files** using Node.js streams.
