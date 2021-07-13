import 'reflect-metadata';
import { container } from '../container';
import {RequestHandler, Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { TYPES } from '../constants/types';
import { BudgetItem } from '../models/budget_item';


const schema = Joi.object().keys({
    id: Joi.string().uuid(),
    title: Joi.string().alphanum().min(3).max(30).required(),
    fulfillmentDate: Joi.date().required(),
    price: Joi.number().min(0).required(),
    requestor: Joi.string().required(),
    resolution: Joi.string()
});

export function budgetItemValidation(req: Request, res: Response, next: NextFunction) {
    let item;
    if(req.query.hasOwnProperty('user')) {
        item = req.query.user;
    } else {
        item = req.body;
    }
    const result = schema.validate(item);
    if(result.error) {
        res.status(400).json({message: 'Invalid Budget Item'}).send();
    }
    next();
};

export function budgetItemsValidation(req: Request, res: Response, next: NextFunction) {
    let items;
    if(req.query.hasOwnProperty('users')) {
        items = req.query.users;
    } else {
        items = req.body;
    }
    items.forEach((item: BudgetItem) => {
        const result = schema.validate(item);
        if(result.error) {
            res.status(400).json({message: 'Invalid Budget Item'}).send();
        }
    });
    next();
};

container.bind<RequestHandler>(TYPES.BudgetItemValidation).toConstantValue(budgetItemValidation);
container.bind<RequestHandler>(TYPES.BudgetItemsValidation).toConstantValue(budgetItemsValidation);
