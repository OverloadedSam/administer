import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required!'],
    },
    description: {
      type: String,
      required: [true, 'Description is required!'],
    },
    category: {
      type: String,
      required: [true, 'Category is required!'],
    },
    rating: {
      type: Number,
    },
    supply: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
