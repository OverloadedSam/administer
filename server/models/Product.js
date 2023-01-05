import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
    },
    price: {
      type: Number,
      require: [true, 'Price is required!'],
    },
    description: {
      type: String,
      require: [true, 'Description is required!'],
    },
    category: {
      type: String,
      require: [true, 'Category is required!'],
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
