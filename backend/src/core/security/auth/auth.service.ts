import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './configs/refresh-jwt.config';
import type { ConfigType } from '@nestjs/config';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findAuthUserByUsername(username);
    if (!user) throw new UnauthorizedException('User not found');
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');
    const { password: _, ...result } = user;
    return result;
  }

  login(userName: string) {
    const payload: AuthJwtPayload = {
      sub: userName,
    };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);
    return {
      username: userName,
      access_token: token,
      refresh_token: refreshToken,
    };
  }

  refreshToken(userName: string) {
    const payload: AuthJwtPayload = {
      sub: userName,
    };
    const token = this.jwtService.sign(payload);
    return {
      username: userName,
      access_token: token,
    };
  }
}
