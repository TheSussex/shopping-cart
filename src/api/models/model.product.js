import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    categoryCode: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    stockLevel: {
      type: Number,
      default: 0,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const ProductModel = model('product', productSchema);

export default ProductModel;
