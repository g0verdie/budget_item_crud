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
import { Repository } from "typeorm";
import { BudgetItem } from "../models/budget_item";
import { TYPES } from "../constants/types";
import { container } from "../container";

@controller("/budget-item")
export class BudgetItemController {
  public constructor(
    @inject(TYPES.BudgetItemRepository)
    private BudgetItemRepository: Repository<BudgetItem>
  ) {}

  @httpGet("/")
  public async get(@response() res: Response) {
    try {
      return await this.BudgetItemRepository.find();
    } catch (e) {
      res.status(500);
      res.send(e.message);
    }
  }
  @httpGet("/requestor/:requestor")
  public async getByYear(
    @response() res: Response,
    @requestParam("requestor") requestor: string
  ) {
    try {
      return await this.BudgetItemRepository.find({
        requestor,
      });
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
    if (
      !(typeof newBudgetItem.title === "string") ||
      isNaN(newBudgetItem.price)
    ) {
      res.status(400);
      res.send(`Invalid BudgetItem!`);
    }
    try {
      return await this.BudgetItemRepository.save(newBudgetItem);
    } catch (e) {
      res.status(500);
      res.send(e.message);
    }
  }
}
