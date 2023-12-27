import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const statusCode = exception.getStatus();

    response.status(statusCode).json({
      statusCode,
      message: exception.message || HttpStatus[statusCode],
      success: false,
      data: null,
    });
  }
}
