
import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Search = mongoose.model('Search', searchSchema);
export default Search;