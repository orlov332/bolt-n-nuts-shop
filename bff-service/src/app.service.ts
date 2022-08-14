import {
  BadGatewayException,
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { catchError, map, of, tap, throwError } from 'rxjs';
import * as util from 'util';

const PRODUCT_LIST_CACHE_NAME = 'product_list_cache';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async proxyCallCached(method: string, url: string, body: any, headers: any) {
    if (method.toLowerCase() === 'get' && url === '/products') {
      const productList = await this.cacheManager.get(PRODUCT_LIST_CACHE_NAME);
      if (!productList) {
        return this.proxyCall(method, url, body, headers).pipe(
          tap((products) =>
            this.cacheManager.set(PRODUCT_LIST_CACHE_NAME, products),
          ),
        );
      }
      this.logger.log(`Retrieving product list from cache`);
      return of(productList);
    } else return this.proxyCall(method, url, body, headers);
  }

  private proxyCall(method: string, url: string, body: any, headers: any) {
    this.logger.log(`Incoming request: ${method} ${url}`);
    this.logger.log(`Body: ${util.inspect(body)}`);
    this.logger.log(`Headers: ${util.inspect(headers)}`);

    const target = url.split(/[\/?]/)[1];
    const targetUrl = process.env[`TARGET_URL.${target.toUpperCase()}`];
    this.logger.log(`Redirecting call to: ${targetUrl}${url}`);
    if (!targetUrl) throw new BadGatewayException('Cannot process request');

    return this.httpService
      .request({
        method,
        baseURL: targetUrl,
        url,
        data: Object.keys(body).length === 0 ? undefined : body,
        headers: { authorization: headers.authorization || '' },
      })
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          if (error.response) {
            this.logger.log(
              `Error from target call: ${util.inspect(
                error.response.data.message,
              )}`,
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
