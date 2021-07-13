import { Request } from "jest-express/lib/request";
import { Response } from "jest-express/lib/response";
import Joi from "joi";
import {
  budgetItemValidation,
  budgetItemsValidation,
} from "../../src/middleware/budget_item_validation_middleware";
import { BudgetItem } from "../../src/models/budget_item";

let request: any;
let response: any;
let next: any;
let badRequest: any;
let goodItem: any;
let badItem: any;

describe("Budget Item Validation Handling Middleware", () => {
  beforeEach(() => {
    next = jest.fn();
    request = new Request("/crud-api/budget-item", {
      headers: {
        Accept: "text/html",
      },
      method: "POST",
    });
    badRequest = new Request("/crud-api/budget-item", {
      headers: {
        Accept: "text/html",
      },
    });
    badRequest.setBody({
      stringValue: 14321,
    });

    //response = new Response();
  });

  afterEach(() => {
    request.resetMocked();
    next.mockClear();
  });

  test("BudgetItem validator passes through the call if properly formatted item has been passed", async () => {
    goodItem = {
      title: "hello",
      fulfillmentDate: new Date(),
      price: 123,
      requestor: "Ilya Dyskin",
    };
    const res: any = {
      send: jest.fn(),
    };

    request.setBody(goodItem);

    expect(next).toHaveBeenCalledTimes(1);
  

    const result = budgetItemValidation(request, response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.send).not.toHaveBeenCalled();
  });

  test("BudgetItem validator does not pass through the call if properly formatted item has not been passed", async () => {
    badItem = {
        fulfillmentDate: new Date(),
        price: 123,
        requestor: "Ilya Dyskin",
      };
      const res: any = {
        status: jest.fn(),
        send: jest.fn(),
      };

    const result = budgetItemValidation(request, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
