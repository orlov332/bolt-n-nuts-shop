import { All, Controller, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All('*')
  proxyCall(@Req() request: Request) {
    return this.appService.proxyCall(
      request.method,
      request.originalUrl,
      request.body,
      request.headers,
    );
  }
}
