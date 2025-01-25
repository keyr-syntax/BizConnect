import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("keyr", "root", "keyr", {
  dialect: "mysql",
  host: "localhost",
  logging: false,
});

// const SEQUELIZE = new Sequelize(
//   "keyrunqk_note-app-nextjs",
//   "keyrunqk_keyr",
//   "ISLAMISBEST@1234",
//   {
//     dialect: "mysql",
//     host: "localhost",
//     logging: false,
//   }
// );
