import { provide } from "inversify-binding-decorators";
import { TYPES } from "../constants/types";
import { BudgetItem } from "../models/budget_item";
import { inject } from "inversify";
import { Repository } from "typeorm";


@provide(TYPES.BudgetItemService)
export class BudgetItemService {
  public constructor() {}

  public async getAllBudgetItems() {
    //return this.BudgetItemRepository.getBudgetItems();
    return BudgetItem.find();
  }
  
  public async getBudgetItemByTitle(title: string) : Promise<BudgetItem> {
    return BudgetItem.findByTitle(title);
  }

  public async getBudgetItemById(id: string) : Promise<BudgetItem> {
    return BudgetItem.findOne(id);
  }

  public async getBudgetItemsByRequestor(requestor: string) : Promise<BudgetItem[]> {
    return BudgetItem.findByRequestor(requestor);
  }

  public async getBudgetItemsCreatedAfter(date: string) : Promise<BudgetItem[]> {
    return BudgetItem.findAllPastCreationDate(date);
  }
  
}
