import enums from '../../lib/enums';
import * as CategoryService from '../services/service.category';
import ApiResponse from '../../lib/http/lib.http.response';
import CategoryModel from '../models/model.category';

export const addCategory = async(req, res, next) => {
  try {
    const { body } = req;
    const payload = { ...body };
    const category = await CategoryService.addNewCategory(CategoryModel, payload);
    return ApiResponse.success(res, enums.CATEGORY_CREATED, enums.HTTP_CREATED, category);
  } catch (error) {
    error.label = enums.ADD_CATEGORY_CONTROLLER;
    return next(error);
  }
};

export const getCategory = async(req, res, next) => {
  try {
    const { category } = req;
    return ApiResponse.success(res, enums.CATEGORY_FETCHED, enums.HTTP_OK, category);
  } catch (error) {
    error.label = enums.GET_CATEGORY_CONTROLLER;
    return next(error);
  }
};

export const getCategories = async(req, res, next) => {
  try {
    const categories = await CategoryService.getAllCategories();
    return ApiResponse.success(res, enums.CATEGORY_FETCHED, enums.HTTP_OK, categories);
  } catch (error) {
    error.label = enums.GET_ALL_CATEGORIES_CONTROLLER;
    return next(error);
  }
};
