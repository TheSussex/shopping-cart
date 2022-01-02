import {
  devENV,
  stagingENV,
} from './env';

const { NODE_ENV } = process.env;

export default {
  development: devENV,
  staging: stagingENV,
}[NODE_ENV || 'development'];
