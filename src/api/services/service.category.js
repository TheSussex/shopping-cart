import CategoryModel from '../models/model.category';

export const findCategory = async(payload) => CategoryModel.findOne(payload);

export const addNewCategory = async(model, data) => model.create(data);

export const getAllCategories = async() => CategoryModel.find();
