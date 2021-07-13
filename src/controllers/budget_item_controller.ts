import { Request, RequestHandler, Response } from "express";
import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  response,
  requestParam,
  requestBody,
  httpPut,
  httpDelete,
  BaseHttpController,
} from "inversify-express-utils";
import { BudgetItem } from "../models/budget_item";
import { TYPES } from "../constants/types";
import { container } from "../container";
import { BudgetItemService } from "../services/budget_item_service";

@controller("/budget-item")
export class BudgetItemController extends BaseHttpController {
  public constructor(
    @inject(TYPES.BudgetItemService)
    private BudgetItemService: BudgetItemService
  ) {
    super();
  }

  @httpGet("/")
  public async getBudgetItems(@response() res: Response) {
    try {
      return await this.BudgetItemService.getAllBudgetItems();
    } catch (e) {
      res.status(500);
      res.send(e.message);
    }
  }
  @httpGet("/requestor/:requestor")
  public async getBudgetItemsByRequestor(
    @response() res: Response,
    @requestParam("requestor") requestor: string
  ) {
    try {
      return await this.BudgetItemService.getBudgetItemsByRequestor(requestor);
    } catch (e) {
      res.status(500);
      res.send(e.message);
    }
  }
  @httpPost("/", container.get<RequestHandler>(TYPES.BudgetItemValidation))
  public async addBudgetItem(
    @response() res: Response,
    @requestBody() newBudgetItem: BudgetItem
  ) {
    try {
      return await this.BudgetItemService.saveBudgetItem(newBudgetItem);
    } catch (e) {
      res.status(500);
      res.send(e.message);
    }
  }

  @httpPost("/", container.get<RequestHandler>(TYPES.BudgetItemsValidation))
  public async addBudgetItems(
    @response() res: Response,
    @requestBody() newBudgetItems: BudgetItem[]
  ): Promise<BudgetItem[]> {
    try {
      return await this.BudgetItemService.saveBudgetItems(newBudgetItems);
    } catch (e) {
      res.status(500);
      res.send(e.message);
    }
  }

  @httpPut("/", container.get<RequestHandler>(TYPES.BudgetItemValidation))
  public async updateBudgetItem(
    @response() res: Response,
    @requestBody() updatedItem: BudgetItem
  ): Promise<BudgetItem> {
    try {
      return await this.BudgetItemService.updateBudgetItem(updatedItem);
    } catch (e) {
      res.status(500);
      res.send(e.message);
    }
  }

  @httpDelete("/:id")
  public async deleteBudgetItemById(
    @response() res: Response,
    @requestParam("id") id: string
  ) {
    try {
      return await this.BudgetItemService.deleteBudgetItemById(id);
    } catch (e) {
      res.status(500);
      res.send(e.message);
    }
  }
}
