import { sequelize } from "./database";

export default async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully");
    await sequelize.sync();
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Error while syncing database:", error);
  }
}
