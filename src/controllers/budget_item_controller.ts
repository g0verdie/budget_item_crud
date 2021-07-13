import { Request, RequestHandler, Response } from "express";
import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  response,
  requestParam,
  requestBody,
} from "inversify-express-utils";
import { BudgetItem } from "../models/budget_item";
import { TYPES } from "../constants/types";
import { container } from "../container";
import { BudgetItemService } from '../services/budget_item_service';

@controller("/budget-item")
export class BudgetItemController {
  public constructor(
    @inject(TYPES.BudgetItemService)
    private BudgetItemService: BudgetItemService
  ) {}

  @httpGet("/")
  public async get(@response() res: Response) {
    try {
      return await this.BudgetItemService.getAllBudgetItems();
    } catch (e) {
      res.status(500);
      res.send(e.message);
    }
  }
  @httpGet("/requestor/:requestor")
  public async getByRequestor(
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
  @httpPost("/", 
  container.get<RequestHandler>(TYPES.BudgetItemValidation)
  )
  public async post(
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
}
