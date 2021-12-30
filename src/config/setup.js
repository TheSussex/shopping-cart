import {
  devENV,
} from './env';

const { NODE_ENV } = process.env;

export default {
  development: devENV,
}[NODE_ENV || 'development'];
