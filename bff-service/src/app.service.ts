import {
  BadGatewayException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map, throwError } from 'rxjs';
import * as util from 'util';

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
    if (!targetUrl) throw new BadGatewayException('Cannot process request');

    return this.httpService
      .request({
        method,
        baseURL: targetUrl,
        url,
        data: body,
        headers: { authorization: headers.authorization || '' },
      })
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          if (error.response) {
            this.logger.log(
              `Error from target call: ${util.inspect(error.response)}`,
            );
            return throwError(
              () =>
                new HttpException(
                  error.response.data.message,
                  error.response.status,
                ),
            );
          }
          this.logger.error(`Unknown axios error: ${util.inspect(error)}`);
          return throwError(() => error);
        }),
      );
  }
}
