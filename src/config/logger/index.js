import winston from 'winston';

const transports = (level, maxFiles) => [
  new winston.transports.Console({
    level,
    handleExceptions: true,
    json: false,
    colorize: true,
  }),
  new winston.transports.File({
    level: 'info',
    filename: './server.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles,
    colorize: true,
  }),
];

const live = (level, maxFiles) => winston.createLogger({
  transports: transports(level, maxFiles),
  exitOnError: false,
});

const defaultLogger = {
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
};

const getLogger = (env) => {
  switch (env) {
  case 'production': return live('error', 100);

  case 'staging': return live('error', 100);

  case 'development': return live('debug', 6);

  // eslint-disable-next-line new-cap
  default: return new winston.createLogger(defaultLogger);
  }
};

const logger = (env) => {
  let ret = '';

  ret = getLogger(env);

  ret.stream = {
    write: (message /* encoding */) => {
      logger.info(message);
    },
  };

  return ret;
};

export default logger;
