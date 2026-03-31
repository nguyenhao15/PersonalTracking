import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET || 'secretKey',
    signOptions: {
      expiresIn: (process.env.JWT_EXPIRES_IN as unknown as number) || '1h', // 1 hour in seconds
    },
  }),
);
