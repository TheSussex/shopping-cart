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
export const GET_AUTH_TOKEN_MIDDLEWARE = 'AuthMiddleware::getAuthToken';
export const VALIDATE_AUTH_TOKEN_MIDDLEWARE = 'AuthMiddleware::validateAuthToken';
export const IS_ADMIN_MIDDLEWARE = 'AuthMiddleware::isAdmin';
export const GET_CATEGORY_MIDDLEWARE = 'CategoryMiddleware::getCategory';
export const ADD_CATEGORY_CONTROLLER = 'CategoryController::addCategory';
export const GET_CATEGORY_CONTROLLER = 'CategoryController::getCategory';
export const GET_ALL_CATEGORIES_CONTROLLER = 'CategoryController::getAllCategories';
export const GET_PRODUCT_IN_CATEGORY_MIDDLEWARE = 'ProductMiddleware::getProductInCategory';
export const GET_PRODUCT_MIDDLEWARE = 'ProductMiddleware::getProduct';
export const GET_PRODUCT_CONTROLLER = 'ProductController::getProduct';
export const EDIT_PRODUCT_CONTROLLER = 'ProductController::editProduct';
export const GET_CART_MIDDLEWARE = 'CartMiddleware::getCart';
export const ADD_PRODUCT_TO_CART_CONTROLLER = 'CartController::addProductToCart';
export const GET_CART_CONTROLLER = 'CartController::getCart';
export const GET_ITEM_IN_CART_CONTROLLER = 'CartController::getCartItem';
export const DELETE_FROM_CART_CONTROLLER = 'CartController::deleteFromCart';
export const DELETE_CART_CONTROLLER = 'CartController::deleteCart';
export const EDIT_PRODUCT_IN_CART_CONTROLLER = 'CartController::editProductInCart';
export const GET_ITEM_IN_CART_MIDDLEWARE = 'CartMiddleware::getItemInCart';
