import { createConnection } from "typeorm";
import { BudgetItem } from './models/budget_item';

export async function getDbConnection() {
    const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
    const DATABASE_USER = process.env.DATABASE_USER || "";
    const DATABASE_PORT = 5432;
    const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "";
    const DATABASE_DB = "demo";

    const entities = [
        BudgetItem
    ];

    const conn = await createConnection({
        name: "budgetItemConnection",
        type: "mysql",
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_DB,
        entities: entities,
        synchronize: true
    });

    return conn;
}