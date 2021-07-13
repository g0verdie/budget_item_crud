import 'reflect-metadata';
import { container } from '../container';
import {RequestHandler } from 'express';


function logger(req: any, res: any, next: any) {

    console.log(JSON.stringify(req));
    next();
};

container.bind<RequestHandler>('LoggerMiddleware').toConstantValue(logger);