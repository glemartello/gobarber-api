import 'reflect-metadata';
import 'dotenv/config';
import express, { Application, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';

import cors from 'cors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

class App {
  public server: Application;

  public constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.server.use(express.json());
    this.server.use(cors());
  }

  private routes(): void {
    this.server.use('/files', express.static(uploadConfig.uploadsFolder));
    this.server.use(rateLimiter);
    this.server.use(routes);
    this.server.use(errors);
    this.server.use(
      (
        err: Error,
        request: Request,
        response: Response,
        _next: NextFunction,
      ) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: 'error',
            messsage: err.message,
          });
        }
        console.error(err);
        return response.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      },
    );
  }
}

export default new App().server;
