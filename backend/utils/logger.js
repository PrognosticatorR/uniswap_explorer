import chalk from 'chalk';
import * as winston from 'winston';

const logger = new winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'HH:mm:ss:ms' }),
        winston.format.colorize(),
        winston.format.printf(info => `${chalk.bold.bgCyan('UniswapExplorer:')} ${info.level}: ${info.message}`)
      )
    })
  ],
  exitOnError: false
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message.trim());
  },
  console: function (message, encoding) {
    logger.debug(message.trim());
  }
};

export default logger;
