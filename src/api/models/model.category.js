import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryCode: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    products: [ String ],
  },
  { timestamps: true },
);

const CategoryModel = model('category', categorySchema);

export default CategoryModel;
