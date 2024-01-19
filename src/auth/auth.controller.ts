import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @Post('refresh-token')
    getRefreshToken(@Body() req : {refresh_token : string}){
      
      return this.authService.getRefreshToken(req.refresh_token);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
