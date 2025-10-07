const { connectDB, mongoose } = require('./db');
const { Book } = require('./Modes/books');

async function insertBooks() {
  await connectDB();

  //Finding all books
  const books = await Book.find();
  console.log(books)

  // Finding all books in a specific genre
  const books = await Book.find({ genre: "Fiction" });
  console.log(books);

  // Finding books published after a certain year
  const books = await Book.find({ year: { $gt: 1951 } });

  // Finding books by a specific author
  const books = Book.find({ author: "Paulo Coelho" });

  // Updating the price of a specific book
  const books = await Book.updateOne(
    { title: "The Alchemist" }, {$set: { price: 15 } });

  // Deleting a book by its title
  const books = await Book.deleteOne(
    {title: "Animal Farm"}
  );

  // Books that are both in stock and published after 2010
  const books = await Book.find({
      in_stock: true, 
      published_year: { $gt: 2010 } 
  });

  // Using projection to return only the title, author, and price fields 
  const books = await Book.find({}, 'title author price');
  console.log(books);

  // Displaying books by price in ascending order
  const books = await Book.find().sort({ price: 1 });
  console.log(books);

  // Displaying books by price in descending order
  const books = await Book.find().sort({ price: -1 });
  console.log(books);

  // Using the `limit` and `skip` methods to implement pagination (5 books per page)
  const page = 2;
  const limit = 5;
  const skip = (page - 1) * limit;

  const books = await Book.find()
  .sort({ title: 1 })
  .skip(skip)
  .limit(limit);

  console.log(books);

  // Creating an aggregation pipeline to calculate the average price of books by genre
  const result = await Book.aggregate([
    {
      $group: {
        _id: "$genre",                // group by genre
        averagePrice: { $avg: "$price" } // calculate average price
      }
    }
  ]);

 console.log(result);

 // Creating an aggregation pipeline to find the author with the most books in the collection
 const result = await Book.aggregate([
    {
      $group: {
        _id: "$author",           // group by author name
        totalBooks: { $sum: 1 }   // count the number of books per author
      }
    },
    {
      $sort: { totalBooks: -1 }   // sort by totalBooks (descending)
    },
    {
      $limit: 1                   // take only the top author
    },
    {
      $project: {
        _id: 0,
        author: "$_id",
        totalBooks: 1
      }
    }
  ]);

  console.log(result);

  // a pipeline that groups books by publication decade and counts them
  const result = await Book.aggregate([
    {
      // Stage 1: Compute the decade for each book
      $addFields: {
        decade: {
          $multiply: [
            { $floor: { $divide: ["$published_year", 10] } }, // divide year by 10 and floor it
            10 // multiply back by 10 (e.g., 199 -> 1990)
          ]
        }
      }
    },
    {
      // Stage 2: Group by decade and count books
      $group: {
        _id: "$decade",
        totalBooks: { $sum: 1 }
      }
    },
    {
      // Stage 3: Sort by decade ascending
      $sort: { _id: 1 }
    },
    {
      // Stage 4: Clean up the output
      $project: {
        _id: 0,
        decade: "$_id",
        totalBooks: 1
      }
    }
  ]);

 console.log(result);

 // creating an index on the `title` field for faster searches
 await Book.createIndexes({ title: 1 });

 // Creating a compound index on `author` and `published_year
 await Book.createIndexes({ author: 1, published_year: -1 });

 // Using the `explain()` method to demonstrate the performance improvement with your indexes
 await Book.createIndexes({ author: 1, published_year: -1 });

 const result = await Book.find({
  author: "James Clear",
  published_year: { $gte: 2015 }
 }).explain("executionStats");

 console.log(JSON.stringify(result, null, 2));

}

insertBooks();

