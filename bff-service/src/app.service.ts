import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly httpService: HttpService) {}

  proxyCall(method: string, url: string, body: any, headers: any) {
    this.logger.log(`Incoming request: ${method} ${url}`);
    this.logger.log(`Body: ${JSON.stringify(body)}`);
    this.logger.log(`Headers: ${JSON.stringify(headers)}`);

    const target = url.split(/[\/?]/)[1];
    const targetUrl = process.env[`TARGET_URL.${target.toUpperCase()}`];
    this.logger.log(`Redirecting call to: ${targetUrl}${url}`);
    if (!targetUrl) throw new NotFoundException();

    return this.httpService
      .request({
        method,
        baseURL: targetUrl,
        url,
        data: body,
        headers: { authorization: headers.authorization || '' },
      })
      .pipe(map((res) => res.data));
  }
}
