import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    active: {
      type: Boolean,
      default: true,
    },
    products: [
      {
        productId: String,
        quantity: Number,
        productName: String,
        sellingPrice: Number,
        size: String,
      },
    ],
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const CartModel = model('cart', cartSchema);

export default CartModel;
