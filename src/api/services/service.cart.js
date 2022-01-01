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
    const { id, cartId } = data;
    const filter = { _id: cartId, 'products.productId': id };
    const update = { $inc: { 'products.$.quantity': 1 } };
    return CartModel.findOneAndUpdate(filter, update, { new: true });
};

export const deleteFromCart = async(data) => {
    const { productId, cartId } = data;
    const filter = { _id: cartId, 'products.productId': productId };
    const update = { $pull: { products: { productId } } };
    return CartModel.findOneAndUpdate(filter, update, { new: true });
};

export const deleteCart = async(id) => CartModel.deleteOne({ userId: id });

export const editProductInCart = async(data) => {
    const { productId, quantity, size, cartId } = data;
    const filter = { _id: cartId, 'products.productId': productId };
    const update = { $set: { 'products.$.quantity': quantity, 'products.$.size': size } };
    return CartModel.findOneAndUpdate(filter, update, { new: true });
};

export const getItemInCart = async(data) => {
    const { id, cartId } = data;
    const filter = { _id: cartId, 'products.productId': id };
    return CartModel.findOne(filter);
};