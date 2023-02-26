import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomLogger } from 'src/customLogger/customLogger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  logLevel = +process.env.LOGGING_LEVEL;
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const { httpAdapter } = this.httpAdapterHost;
    const logger = new CustomLogger();
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof HttpException) {
      if (this.logLevel > 0)
        await logger.warn(
          `Warning: \n statusCode: ${exception.getStatus()}, \n message: ${
            exception.message
          }`,
        );
    } else {
      if (this.logLevel > 1)
        await logger.error(
          `Error: \n statusCode: ${HttpStatus.INTERNAL_SERVER_ERROR}, \n message: Internal Server Error`,
        );
    }
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server Error';

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
