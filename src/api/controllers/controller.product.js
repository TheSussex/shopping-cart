import enums from '../../lib/enums';
import * as ProductService from '../services/service.product';
import ApiResponse from '../../lib/http/lib.http.response';
import ProductModel from '../models/model.product';
import Hash from '../../lib/hash';

export const addProductToCategory = async(req, res, next) => {
  try {
    const { body } = req;
    body.sku = Hash.generateRandomStrings();
    const payload = { ...body };
    const product = await ProductService.addNewProduct(ProductModel, payload);
    await ProductService.addNewProductToCategory(body);
    return ApiResponse.success(res, enums.CATEGORY_CREATED, enums.HTTP_CREATED, product);
  } catch (error) {
    error.label = enums.ADD_CATEGORY_CONTROLLER;
    return next(error);
  }
};

export const getProduct = async(req, res, next) => {
  try {
    const { product } = req;
    return ApiResponse.success(res, enums.PRODUCT_FETCHED, enums.HTTP_OK, product);
  } catch (error) {
    error.label = enums.GET_PRODUCT_CONTROLLER;
    return next(error);
  }
};

export const deleteProduct = async(req, res, next) => {
  try {
    const { params: { id } } = req;
    const product = await ProductService.deleteProduct(id);
    return ApiResponse.success(res, enums.PRODUCT_DELETED, enums.HTTP_OK, '');
  } catch (error) {
    error.label = enums.ADD_CATEGORY_CONTROLLER;
    return next(error);
  }
};

export const editProduct = async(req, res, next) => {
  try {
    const { body, query: { sku } } = req;
    const payload = { ...body, sku };
    const product = await ProductService.editProduct(payload);
    return ApiResponse.success(res, enums.PRODUCT_UPDATED, enums.HTTP_OK, product);
  } catch (error) {
    error.label = enums.EDIT_PRODUCT_CONTROLLER;
    return next(error);
  }
};
