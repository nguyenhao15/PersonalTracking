import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './configs/refresh-jwt.config';
import type { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';
import { CurrentUser } from './types/current-user';

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

  async login(userName: string) {
    const { access_token, refresh_token } = await this.generateToken(userName);
    const hashedRefreshToken = await argon2.hash(refresh_token);
    await this.userService.updateHashedRefreshToken(
      userName,
      hashedRefreshToken,
    );
    return {
      username: userName,
      access_token,
      refresh_token,
    };
  }

  async generateToken(userName: string) {
    const payload: AuthJwtPayload = {
      sub: userName,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(userName: string) {
    const { access_token, refresh_token } = await this.generateToken(userName);
    const hashedRefreshToken = await argon2.hash(refresh_token);
    await this.userService.updateHashedRefreshToken(
      userName,
      hashedRefreshToken,
    );
    return {
      username: userName,
      access_token,
      refresh_token,
    };
  }

  async validateRefreshToken(userName: string, refreshToken: string) {
    const user = await this.userService.findByUsername(userName);
    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const isRefreshTokenValid = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return user;
  }

  async logout(userName: string) {
    await this.userService.updateHashedRefreshToken(userName, '');
  }

  async validateJwtUser(userName: string) {
    const user = await this.userService.findByUsername(userName);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    const currentUser: CurrentUser = {
      username: user.username,
      role: user.role,
    };
    return currentUser;
  }
}
