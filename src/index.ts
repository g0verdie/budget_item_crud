import "reflect-metadata";
import * as express from 'express';
import morgan from 'morgan';
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { getDbConnection } from "./db";
import { container } from './container';
import './controllers/controller_loader';

//import './middleware/middleware_loader';
import { budgetItemValidation } from './middleware/budget_item_validation_middleware';
import { TYPES } from './constants/types';

(async () => {
    const port = 3000;
    await getDbConnection();

    
    let server = new InversifyExpressServer(container);

    container.bind<express.RequestHandler>('Morgan').toConstantValue(morgan('combined'));
    container.bind<express.RequestHandler>(TYPES.BudgetItemValidation).toConstantValue(budgetItemValidation);

    server.setConfig((app) => {
        app.use(bodyParser.urlencoded({
            extended:true
        }));
        app.use(bodyParser.json());
        app.use(helmet());
    });

    let app = server.build();
    app.listen(port);
    console.log(`Server running at http://127.0.0.1:${port}`);
});
