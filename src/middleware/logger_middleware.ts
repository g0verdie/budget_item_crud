import 'reflect-metadata';
import { container } from '../container';
import * as express from 'express';


function logger(req: any, res: any, next: any) {

    console.log(JSON.stringify(req));
    next();
};

container.bind<express.RequestHandler>('LoggerMiddleware').toConstantValue(logger);