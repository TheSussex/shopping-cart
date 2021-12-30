import {
    devENV, testENV, stagingENV,
  } from './env';
  
  const { NODE_ENV } = process.env;
  
  export default {
    test: testENV,
    development: devENV,
    staging: stagingENV,
  }[NODE_ENV || 'development'];
  