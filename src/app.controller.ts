import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

// domain.com/
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('content-Type', 'application/json')
  getHello(): {name: string} {
    return {name:'hameed'};
  }
}
