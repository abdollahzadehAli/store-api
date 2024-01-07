import * as process from 'process';

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expireDuration: process.env.JWT_EXPIRE_DURATION,
};
