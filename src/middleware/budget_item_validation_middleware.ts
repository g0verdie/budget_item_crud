import 'reflect-metadata';
import { container } from '../container';
import {RequestHandler, Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const schema = Joi.object().keys({
    id: Joi.string().uuid(),
    title: Joi.string().alphanum().min(3).max(30).required()
});

function budgetItemValidation(req: Request, res: Response, next: NextFunction) {
    const result = schema.validate(req.body);
    if(result.error) {
        res.status(500).send();
    }
    next();
};

container.bind<RequestHandler>('BudgetItemValidation').toConstantValue(budgetItemValidation);