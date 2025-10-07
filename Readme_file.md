---

````markdown
# 📘 MongoDB Data Layer Fundamentals & Advanced Techniques

This project demonstrates how to interact with **MongoDB** using **Node.js** and **Mongoose**.  
It includes examples of inserting, querying, updating, aggregating, and optimizing data with indexes.

---

## 🛠️ Prerequisites

Before running the scripts, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (installed locally or using a cloud service like MongoDB Atlas)
- An `.env` file with your MongoDB connection string

---

## ⚙️ Project Setup

1. **Clone or download** this repository.

   ```bash
   git clone <your-repo-link>
   cd <your-project-folder>
````

2. **Install all dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and add your MongoDB connection string:

   ```bash
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database-name>
   ```

4. **Check your database connection**
   Open `db.js` and ensure it exports a working connection function:

   ```js
   const mongoose = require("mongoose");
   const connectDB = async () => {
     await mongoose.connect(process.env.MONGODB_URI);
     console.log("Connected to MongoDB");
   };
   module.exports = { connectDB, mongoose };
   ```

---

## 🧩 Folder Structure

```
📂 mongodb-data-layer-fundamentals-and-advanced-techniques-sammyarmah
 ┣ 📁 Models
 ┃ ┣ 📄 books.js        # Mongoose Book schema and model
 ┣ 📄 insert_books.js   # Script to insert sample book data
 ┣ 📄 queries.js        # Script with MongoDB find(), update(), sort(), and projection examples
 ┣ 📄 aggregation.js    # Scripts for MongoDB aggregation pipelines
 ┣ 📄 db.js             # Database connection setup
 ┣ 📄 .env              # MongoDB connection URI (not shared publicly)
 ┗ 📄 README.md         # Project documentation
```

---

## ▶️ How to Run Each Script

Each script is run directly using Node.js.

### 1️⃣ Insert Sample Data

```bash
node insert_books.js
```

This will insert example book documents into your MongoDB collection.

---

### 2️⃣ Run Queries (Filtering, Projection, Sorting, Pagination)

```bash
node queries.js
```

Examples include:

* Find books by genre
* Find books published after a certain year
* Update the price of a specific book
* Sort books by price (ascending/descending)
* Limit and skip results for pagination

---

### 3️⃣ Run Aggregations

```bash
node aggregation.js
```

Examples include:

* Average book price by genre
* Author with the most books
* Books grouped by decade

---

### 4️⃣ Test Index Performance

```bash
node indexes.js
```

This script:

* Creates a single-field index on `title`
* Creates a compound index on `author` and `published_year`
* Uses `.explain()` to show performance improvements (COLLSCAN → IXSCAN)

---

## 🧠 Example MongoDB Commands Used

| Operation       | Description        | Example                                                                         |
| --------------- | ------------------ | ------------------------------------------------------------------------------- |
| `find()`        | Retrieve documents | `Book.find({ genre: "Fiction" })`                                               |
| `updateOne()`   | Update a field     | `Book.updateOne({ title: "Atomic Habits" }, { $set: { price: 25 } })`           |
| `aggregate()`   | Pipeline analysis  | `Book.aggregate([{ $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }])` |
| `createIndex()` | Optimize searches  | `Book.createIndexes({ author: 1, published_year: -1 })`                         |
| `explain()`     | View query plan    | `Book.find({ author: "James Clear" }).explain("executionStats")`                |

---

## 🧩 Notes

* All models are defined in the `/Models` folder.
* Be sure to run `insert_books.js` first to populate your collection.
* Use `console.log()` to view query outputs directly in your terminal.
* Run scripts one at a time using Node.

---

