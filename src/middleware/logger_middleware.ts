import 'reflect-metadata';
import { container } from '../container';
import {RequestHandler, Request, Response, NextFunction } from 'express';

function logger(req: Request, res: Response, next: NextFunction) {
    console.log(JSON.stringify(req));
    next();
};

container.bind<RequestHandler>('LoggerMiddleware').toConstantValue(logger);