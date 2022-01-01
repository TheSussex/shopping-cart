import CategoryModel from '../models/model.category';
import ProductModel from '../models/model.product';

export const addNewProduct = async(model, data) => model.create(data);

export const findProductInCategory = async(name, code) => CategoryModel.find({ products: name, categoryCode: code });

export const findProduct = async(payload) => ProductModel.findOne(payload);

export const addNewProductToCategory = async(data) => {
  const { productName, categoryCode } = data;
  const filter = { categoryCode };
  const update = { $push: { products: productName } };
  return CategoryModel.findOneAndUpdate(filter, update, { new: true });
};

export const deleteProduct = async(id) => ProductModel.findByIdAndRemove(id);

export const editProduct = async(data) => {
  const {
    sku, productName, description, sellingPrice, stockLevel, expirationDate,
  } = data;
  const filter = { sku };
  const update = {
    $set: {
      productName, description, sellingPrice, stockLevel, expirationDate,
    },
  };
  return ProductModel.findOneAndUpdate(filter, update, { new: true });
};
