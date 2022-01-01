import enums from '../../lib/enums';
import * as ProductService from '../services/service.product';
import ApiResponse from '../../lib/http/lib.http.response';

export const getProductInCategory = (type = 'validate') => async(req, res, next) => {
  try {
    const { body } = req;
    const product = await ProductService.findProductInCategory(body.productName, body.categoryCode);
    if (product.length !== 0 && type === 'validate') {
      return ApiResponse.error(res, enums.PRODUCT_EXIST, enums.HTTP_BAD_REQUEST, enums.GET_PRODUCT_IN_CATEGORY_MIDDLEWARE);
    }
    req.product = product;
    return next();
  } catch (error) {
    error.label = enums.GET_PRODUCT_IN_CATEGORY_MIDDLEWARE;
    return next(error);
  }
};

export const getProduct = async(req, res, next) => {
  try {
    const { query: { id, sku } } = req;
    let payload = { sku };
    if (!sku) { payload = { _id: id }; }
    const product = await ProductService.findProduct(payload);
    if (!product) {
      return ApiResponse.error(res, enums.PRODUCT_NOT_EXIST, enums.HTTP_BAD_REQUEST, enums.GET_PRODUCT_MIDDLEWARE);
    }
    req.product = product;
    return next();
  } catch (error) {
    error.label = enums.GET_PRODUCT_MIDDLEWARE;
    return next(error);
  }
};
