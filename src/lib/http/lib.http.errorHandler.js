import ApiResponse from './lib.http.response';
import enums from '../enums';

const { MSG_ROUTE_DOES_NOT_EXIST, HTTP_NOT_FOUND } = enums;

export const errorHandler = (error, req, res, next) => {
  const validCode = [ 200, 201, 400, 401, 403, 404, 409, 410, 422, 429, 554, 500, 503 ];
  let errorCode = error.code || 500;
  if (!validCode.includes(errorCode)) {
    errorCode = 500;
  }
  return ApiResponse.error(
    res,
    error,
    errorCode,
    error.label,
  );
};

export const apiNotFound = (req, res) => ApiResponse.error(res, MSG_ROUTE_DOES_NOT_EXIST, HTTP_NOT_FOUND);
