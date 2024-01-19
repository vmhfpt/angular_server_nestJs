import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
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
          return { status :"error", message: "Mật khẩu không chính xác !" };
        }
        const payload = { sub: user._id, email: user.email, name : user.name};
        const access_token = await this.jwtService.signAsync(payload);
        const refresh_token = await this.generateRefreshToken(payload);
        const updateToke = await this.usersService.updateToken(user.email, {token : refresh_token});
        return {
          status : 'success',
          access_token,
          refresh_token,
        };
    }

    async generateRefreshToken(payload : any): Promise<string> {
      return this.jwtService.sign(payload, { secret : 'refreshToken_secret',  expiresIn: '1h' });
    }
    verifyToken(token: string) {
      return this.jwtService.verify(token, { secret: 'refreshToken_secret' });
    }
    async verifyTokenUser(email: string ){
      const user = await this.usersService.findOne(email);
      return this.verifyToken(user.token);
    }

    async getRefreshToken(refresh_token : string){
       if(!refresh_token) throw new ForbiddenException('Token is empty or invalid');
      
       try {
          const decode = this.verifyToken(refresh_token);
         try {
           const email = decode.email;
           await this.verifyTokenUser(email);

           const payload = { sub: decode.sub, email: decode.email, name : decode.name};

           const access_token = await this.jwtService.signAsync(payload);
           const refresh_tokens = await this.generateRefreshToken(payload);
           return {
            status : 'success',
            access_token,
            refresh_token : refresh_tokens,
          };
         } catch (error) {
          throw new UnauthorizedException('refresh_token error');
         }
        } catch (error) {
          throw new UnauthorizedException('refresh_token error');
        }
    }


}


