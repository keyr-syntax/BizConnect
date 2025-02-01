"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
// export const sequelize = new Sequelize(
//   process.env.DB_NAME!,
//   process.env.DB_USER!,
//   process.env.DB_PASSWORD!,
//   {
//     dialect: "mysql",
//     host: "localhost",
//     logging: false,
//   }
// );
exports.sequelize = new sequelize_1.Sequelize("keyrunqk_note-app-nextjs", "keyrunqk_keyr", "ISLAMISBEST@1234", {
    dialect: "mysql",
    host: "localhost",
    logging: false,
});
