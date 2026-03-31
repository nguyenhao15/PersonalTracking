import { registerAs } from '@nestjs/config';
import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'refresh-jwt',
  (): JwtSignOptions => ({
    secret: process.env.JWT_REFRESH_SECRET || 'refreshSecretKey',
    expiresIn:
      (process.env.REFRESH_TOKEN_EXPIRES_IN as unknown as number) ||
      7 * 24 * 3600, // 7 days in seconds
  }),
);
