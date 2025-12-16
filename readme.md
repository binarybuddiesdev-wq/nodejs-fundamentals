# Project Guide & Learning Order

This repository is structured as a **step-by-step Node.js learning project**. The folders are intentionally organized, and **path usage is hardcoded**, so the structure must remain unchanged.

---

## 📚 Recommended Order of Topics

Follow the topics in the exact order below to get the best understanding:

1. **read-write-file-in-terminal**

2. **read-write-files**
   - `read-write-file-sync`
   - `read-write-file-async`

3. **web-server**
   - `simple-web-server`
   - `web-server`
     - This folder contains an `html/` directory.
     - HTML files from this folder are read and served inside `web-server.ts`.

4. **events**
   - By this stage, default Node.js events are already used.
   - This section focuses **only on custom events**: how to create and consume them.

5. **streams**
   - `readable-streams`
   - `writable-streams`
   - `duplex-streams`
   - `transform-streams`

6. **event-loop**

---

## 📌 Important Notes

- File paths used for **reading and writing content are hardcoded**.
- ❗ **Do NOT change the folder structure**, otherwise the code will break.
- Detailed documentation has been added for:
  - **Streams**
  - **Event Loop**

---

## 🧪 utils-testing Folder

There is a folder named **`utils-testing`**, which contains additional utilities used only for testing and documentation generation.

### 1️⃣ utils-testing/streams

- Contains a **Python script** that generates a large JSON file.
- The file size depends on the `TOTAL_RECORDS` value defined inside the Python script.
- ⚠️ **Do NOT push the generated JSON file to Git**, as it can be very large.

---

### 2️⃣ utils-testing/event-loops

- Contains **two Python scripts**.
- These scripts generate **in-depth documentation** related to the Event Loop.
- ⚠️ **Do NOT push the generated documents to Git**.

---

## ▶️ Running Python Scripts

Use the following command to run any Python utility file:

```bash
python fileName.py
```

### Example:

```bash
python generate_big_file.py
```

---

## 🚨 Mandatory Rules

- ❌ Do NOT change the folder structure
- ❌ Do NOT delete the Python files
- ❌ Do NOT commit generated JSON files
- ❌ Do NOT commit generated documentation files

These rules are essential for the project to work as intended.
