import { createLogger, format, transports } from 'winston';

const Logger = createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: { package: '@lunar-kit/converters' },
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  Logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

export default Logger;
