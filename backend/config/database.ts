import { Sequelize } from "sequelize";
const dotenv = require("dotenv");
dotenv.config();
export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    dialect: "mysql",
    host: "localhost",
    logging: false,
  }
);
