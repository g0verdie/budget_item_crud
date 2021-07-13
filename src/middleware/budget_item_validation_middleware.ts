import 'reflect-metadata';
import { container } from '../container';
import {RequestHandler, Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { inject, injectable, tagged } from 'inversify'

const schema = Joi.object().keys({
    id: Joi.string().uuid(),
    title: Joi.string().alphanum().min(3).max(30).required()
});

function budgetItemValidation(req: Request, res: Response, next: NextFunction) {
    const result = schema.validate(req.body);
    if(result.error) {
        res.status(400).json({message: 'Invalid Budget Item'}).send();
    }
    next();
};

export { budgetItemValidation };