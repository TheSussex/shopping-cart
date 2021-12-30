export const VALIDATE_DATA_MIDDLEWARE = 'ModelMiddleware::validateData';
export const GET_USER_MIDDLEWARE = 'UserMiddleware::getUser';
export const REGISTER_USER_CONTROLLER = 'AuthController::registerUser';
export const EMAIL_TOKEN_MIDDLEWARE = 'AuthMiddleware::generateEmailVerificatioToken';
export const HASH_PASSWORD_MIDDLEWARE = 'AuthMiddleware::hashPassword';
export const IS_VERIFIED_MIDDLEWARE = 'AuthMiddleware::isUserVerified';
export const DECRYPT_TOKEN_MIDDLEWARE = 'AuthMiddleware::checkVerificationToken';
export const VERIFY_EMAIL_CONTROLLER = 'AuthController::verifyEmail';
export const COMPARE_PASSWORD_MIDDLEWARE = 'AuthMiddleware::comparePassword';
export const GENERATE_TOKEN_MIDDLEWARE = 'AuthMiddleware::generateAuthenticationToken';
export const LOGIN_CONTROLLER = 'AuthController::login';