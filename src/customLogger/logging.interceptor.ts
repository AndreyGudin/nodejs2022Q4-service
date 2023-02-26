import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CustomLogger } from './customLogger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const logger = new CustomLogger();
    const { body, url, query }: Request = context.switchToHttp().getRequest();
    const message = `Request: \n url: ${url},\n body: ${JSON.stringify(
      body,
    )},\n query: ${JSON.stringify(query)}\n`;
    await logger.log(message);
    return next.handle().pipe(
      map(async (data) => {
        const res: Response = context.switchToHttp().getResponse();
        const message = `Response: \n body: ${JSON.stringify(
          data,
        )},\n statusCode: ${res.statusCode}`;
        await logger.log(message);
        return data;
      }),
    );
  }
}
