import Response from '../../lib/http/lib.http.response';
import enums from '../../lib/enums';

const { HTTP_UNPROCESSABLE_ENTITY, VALIDATE_DATA_MIDDLEWARE } = enums;

const validateData = (schema, type) => async(req, res, next) => {
  try {
    const getType = {
      payload: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
      file: req.files,
    };

    const options = { language: { key: '{{key}} ' } };
    const data = getType[type];

    const isValid = await schema.validate(data, options);
    if (!isValid.error) {
      return next();
    }

    const { message } = isValid.error.details[0];
    return Response.error(res, message.replace(/["]/gi, ''), HTTP_UNPROCESSABLE_ENTITY, VALIDATE_DATA_MIDDLEWARE);
  } catch (error) {
    error.label = VALIDATE_DATA_MIDDLEWARE;
    logger.error(`Joi validation for the incoming request failed:::${enums.VALIDATE_DATA_MIDDLEWARE}`, error.message);
    return next(error);
  }
};

export default validateData;
