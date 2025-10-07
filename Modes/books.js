const { mongoose } = require('../db');
const { Schema } = mongoose;

// establishing the schema
const bookSchema = new Schema({
  title: String,
  author: String,
  genre: String,
  published_year: Number,
  price: Number,
  in_stock: Boolean,
  pages: Number,
  publisher: String
});

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book };