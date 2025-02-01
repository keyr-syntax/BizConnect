"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const companyControllers_1 = require("../controllers/companyControllers");
router.post("/create_company", companyControllers_1.createCompanyDetails);
router.put("/update_company/:id", companyControllers_1.updateCompanyDetails);
router.get("/all_companies", companyControllers_1.findAllCompanies);
router.delete("/delete_company/:id", companyControllers_1.deleteCompany);
router.get("/fetch_company/:id", companyControllers_1.fetchCompanyByID);
exports.default = router;
