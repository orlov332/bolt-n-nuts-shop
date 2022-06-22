import middy from '@middy/core'
import middyJsonBodyParser from '@middy/http-json-body-parser'
import httpCors from '@middy/http-cors';
import httpErrorHandler from '@middy/http-error-handler';
import errorLogger from '@middy/error-logger';

export const middyfy = (handler) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(errorLogger())
    .use(httpErrorHandler())
    .use(httpCors({credentials: true, origin: '*'}));
}
