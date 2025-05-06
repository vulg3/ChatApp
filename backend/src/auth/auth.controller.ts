import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
        private usersService: UsersService
    ) { }

    @Post('login')
    async login(@Body() body: { idToken: string; provider: 'google' | 'facebook' }) {
        return this.authService.loginWithProvider(body.idToken, body.provider)
    }

    @Post('refresh')
    async refresh(@Body() body: { refresh_token: string }) {
        try {
            const decoded = await this.jwtService.verifyAsync(body.refresh_token);
            const user = await this.usersService.findById(decoded.sub);

            const newAccessToken = this.jwtService.sign(
                { sub: user._id },
                { expiresIn: '15m' }
            );

            return { access_token: newAccessToken };
        } catch (err) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

}
