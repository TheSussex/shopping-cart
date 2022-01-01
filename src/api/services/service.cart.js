import CartModel from '../models/model.cart';

export const findCart = async(payload) => CartModel.findOne(payload);

export const createUserCart = async(model, data) => model.create(data);

export const updateCart = async(data) => {
    const { id, productId, quantity, productName, sellingPrice, size } = data;
    const filter = { _id: id };
    const update = { $push: { products: { productId, quantity, productName, sellingPrice, size } } };
    return CartModel.findOneAndUpdate(filter, update, { new: true });
};

export const updateProductQuantityInCart = async(data) => {
    const { id, quantity, cartId } = data;
    const filter = { _id: cartId, productId: id }; // can i filter by both cart id and product id?
    const update = { $inc: { quantity: quantity } };
    return CartModel.findOneAndUpdate(filter, update, { new: true });
};

export const deleteFromCart = async(id) => CartModel.deleteOne({ productId: id });

export const deleteCart = async(id) => CartModel.deleteOne({ userId: id });

export const editProductInCart = async(data) => {
    const { id, quantity, size, cartId } = data;
    const filter = { _id: cartId, productId: id };
    const update = { $set: { quantity, size } };
    return CartModel.findOneAndUpdate(filter, update, { new: true });
};
