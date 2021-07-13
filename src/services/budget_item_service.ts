import { provide } from "inversify-binding-decorators";
import { TYPES } from "../constants/types";
import { BudgetItem } from "../models/budget_item";


@provide(TYPES.BudgetItemService)
export class BudgetItemService {
  public constructor() {}

  public async getAllBudgetItems() {
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

  public async getBudgetItemsCreatedAfter(date: Date) : Promise<BudgetItem[]> {
    return BudgetItem.findAllPastCreationDate(date);
  }

  public async saveBudgetItem(newItem : BudgetItem) : Promise<BudgetItem> {
    return BudgetItem.save(newItem);
  }

  public async saveBudgetItems(newItems: BudgetItem[]) : Promise<BudgetItem[]> {
    return BudgetItem.save(newItems);
  }

  public async updateBudgetItem(updatedItem: BudgetItem) : Promise<BudgetItem> {
    return updatedItem.save();
  }

  public async deleteBudgetItemById(id: string) {
    return BudgetItem.delete(id);
  }
  
}
