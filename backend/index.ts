import express, { Application } from "express";
import syncDatabase from "./config/databaseSync";
import cors from "cors";
const app: Application = express();
import companyRoutes from "./routes/companyRoutes";
import contactRoutes from "./routes/contactRoutes";

syncDatabase();
app.use(cors());
app.use(express.json());
app.use("/company", companyRoutes);
app.use("/contact", contactRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend for Contacto is working",
  });
});

app.listen(5000, (error) => {
  if (error) {
    console.log("Error while starting server", error);
  } else {
    console.log(`server is running on: http://localhost:5000`);
  }
});
