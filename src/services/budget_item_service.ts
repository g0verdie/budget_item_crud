import { provide } from "inversify-binding-decorators";
import { TYPES } from "../constants/types";
import { BudgetItem } from "../models/budget_item";
import { inject } from "inversify";
import { Repository } from "typeorm";
import { BudgetItemRepository } from "../repositories/budget_item_repository";

@provide(TYPES.BudgetItemService)
export class BudgetItemService {
  public constructor(
    @inject(TYPES.BudgetItemRepository)
    private BudgetItemRepository: BudgetItemRepository
  ) {}

  public async getAllBudgetItems() {
    return this.BudgetItemRepository.getBudgetItems();
  }
}
