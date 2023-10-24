import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string): Promise<any> {
  
        const user = await this.usersService.findOne(email);
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user._id, email: user.email, name : user.name};
        const access_token = await this.jwtService.signAsync(payload);
        const updateToke = await this.usersService.updateToken(user.email, {token : access_token});
        return {
          access_token,
        };
      }


}


