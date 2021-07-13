import "reflect-metadata";
import {RequestHandler} from 'express';
import morgan from 'morgan';
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { getDbConnection } from "./db";
import { container } from './container';

// middleware has to be loaded prior to controllers due to the way bindings operate
import './middleware/middleware_loader';
import './controllers/controller_loader';


(async () => {
    const base = "crud-api";
    const port = 3000;
    await getDbConnection();

    
    let server = new InversifyExpressServer(container, null, { rootPath: `*${base}` });

    container.bind<RequestHandler>('Morgan').toConstantValue(morgan('combined'));

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
