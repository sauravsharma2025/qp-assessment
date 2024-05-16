import mongoose from "mongoose";
// Schema definition
const Schema = mongoose.Schema;

const MONGO_URI = 'mongodb://0.0.0.0:27017/myapp';

mongoose.connect(MONGO_URI);
// Define your schema fields here
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantityAvailable: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  }
});

// Create and export your model
const Product = mongoose.model('Product', productSchema);

export default Product;
