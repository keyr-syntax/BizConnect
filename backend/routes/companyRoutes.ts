import express, { Router } from "express";
const router: Router = express.Router();
import {
  createCompanyDetails,
  updateCompanyDetails,
  findAllCompanies,
  deleteCompany,
  fetchCompanyByID,
} from "../controllers/companyControllers";

router.post("/create_company", createCompanyDetails);
router.put("/update_company/:id", updateCompanyDetails);
router.get("/all_companies", findAllCompanies);
router.delete("/delete_company/:id", deleteCompany);
router.get("/fetch_company/:id", fetchCompanyByID);

export default router;
