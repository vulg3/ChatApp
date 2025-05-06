import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as admin from 'firebase-admin';
import fetch from 'node-fetch';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) { }

  async loginWithProvider(idToken: string, provider: 'google' | 'facebook') {
    let decodedToken: any;

    if (provider === 'google') {
      try {
        decodedToken = await admin.auth().verifyIdToken(idToken);
      } catch (e) {
        throw new UnauthorizedException('Invalid Google token');
      }
    } else if (provider === 'facebook') {
      try {
        const res = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${idToken}`
        );
        if (!res.ok) throw new Error();
        decodedToken = await res.json();
      } catch (e) {
        throw new UnauthorizedException('Invalid Facebook token');
      }
    } else {
      throw new UnauthorizedException('Unsupported provider');
    }

    const uid = decodedToken.uid || decodedToken.id;
    const name = decodedToken.name || 'Unnamed';
    const email = decodedToken.email;
    const avatar = decodedToken.picture?.data?.url ?? decodedToken.picture ?? null;

    let user = await this.usersService.findByUid(uid).catch(() => null);

    if (!user) {
      user = await this.usersService.create({
        uid,
        name,
        email,
        avatar,
        provider,
        language: 'vi',
        friends: [],
        blockedUsers: [],
      });
    }

    const accessToken = this.jwtService.sign(
      { sub: user._id },
      { expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: user._id },
      { expiresIn: '7d' },
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user,
    };

  }

}
