import { getConnection } from 'typeorm';
import { BudgetItem } from '../models/budget_item';
import { provide } from 'inversify-binding-decorators';
import { inject } from 'inversify';
import { TYPES } from '../constants/types';
import { userInfo } from 'os';
/*
export function getRepository() {
    const conn = getConnection("budgetItemConnection");
    const budgetItemRepository = conn.getRepository(BudgetItem);
    return budgetItemRepository;
}
*/

@provide(TYPES.BudgetItemRepository)
export class BudgetItemRepository {

    public constructor() {
        //const conn = getConnection("budgetItemConnection");
    }

    public async getBudgetItems() {
        return BudgetItem.find();
    }


}