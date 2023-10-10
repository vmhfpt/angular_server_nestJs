import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Sir let visit https://nestjs.org to read more information about me';
  }
}
