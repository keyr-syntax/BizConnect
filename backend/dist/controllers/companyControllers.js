"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCompanyByID = exports.deleteCompany = exports.findAllCompanies = exports.updateCompanyDetails = exports.createCompanyDetails = void 0;
const companyModel_1 = __importDefault(require("../models/companyModel"));
const contactModel_1 = __importDefault(require("../models/contactModel"));
const createCompanyDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyName, companyAddress, companyWebsite, companyCategory, isDraft, } = req.body;
    console.log("Body", req.body);
    if (!companyName ||
        companyName.trim() === "" ||
        !companyAddress ||
        companyAddress.trim() === "" ||
        !companyCategory ||
        companyCategory.trim() === "") {
        res.status(400).json({
            success: false,
            message: "Please fill all required fields",
        });
        return;
    }
    const doesCompanyExist = yield companyModel_1.default.findOne({
        where: {
            companyName: companyName,
            companyAddress: companyAddress,
            companyCategory: companyCategory,
        },
    });
    if (doesCompanyExist) {
        res.status(400).json({
            success: true,
            message: "Company already exists",
            company: doesCompanyExist,
        });
        return;
    }
    try {
        const newCompany = yield companyModel_1.default.create({
            companyName,
            companyAddress,
            companyWebsite: companyWebsite || null,
            companyCategory,
            isDraft,
        });
        if (newCompany) {
            res.status(201).json({
                success: true,
                company: newCompany,
            });
            return;
        }
        else {
            res.status(400).json({
                success: false,
                message: "Failed to create company",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while creating company", error);
        res.status(500).json({
            success: false,
            message: "Failed to create company",
        });
    }
});
exports.createCompanyDetails = createCompanyDetails;
const updateCompanyDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { companyName, companyAddress, companyWebsite, companyCategory, isDraft, } = req.body;
    if (!companyName ||
        companyName.trim() === "" ||
        !companyAddress ||
        companyAddress.trim() === "" ||
        !companyCategory ||
        companyCategory.trim() === "") {
        res.status(400).json({
            success: false,
            message: "Please fill all required fields",
        });
        return;
    }
    try {
        const findCompanyByID = yield companyModel_1.default.findByPk(id);
        if (findCompanyByID) {
            const updateCompany = yield findCompanyByID.update({
                companyName,
                companyAddress,
                companyWebsite: companyWebsite || null,
                companyCategory,
                isDraft,
            });
            const findContactsByCompanyID = yield contactModel_1.default.findAll({
                where: {
                    companyID: id,
                },
            });
            res.status(201).json({
                success: true,
                company: updateCompany,
                contactList: findContactsByCompanyID,
            });
            return;
        }
        else {
            const newCompany = yield companyModel_1.default.create({
                companyName,
                companyAddress,
                companyWebsite: companyWebsite || null,
                companyCategory,
                isDraft,
            });
            res.status(201).json({
                success: true,
                company: newCompany,
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while updating company", error);
        res.status(500).json({
            success: false,
            message: "Failed to update company",
        });
    }
});
exports.updateCompanyDetails = updateCompanyDetails;
const findAllCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCompanies = yield companyModel_1.default.findAll();
        if (allCompanies) {
            res.status(200).json({
                success: true,
                company: allCompanies,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "No company found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while fetching companies", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch company list",
        });
    }
});
exports.findAllCompanies = findAllCompanies;
const deleteCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const findCompanyByPK = yield companyModel_1.default.findByPk(id);
        if (findCompanyByPK) {
            const deleteCompanyDetails = yield findCompanyByPK.destroy();
            res.status(200).json({
                success: true,
                message: "Company deleted",
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Company not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while deleting company", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete company",
        });
    }
});
exports.deleteCompany = deleteCompany;
const fetchCompanyByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const getCompanyDetails = yield companyModel_1.default.findByPk(id);
        const getContactsOfCompany = yield contactModel_1.default.findAll({
            where: {
                companyID: id,
            },
        });
        if (getCompanyDetails) {
            res.status(200).json({
                success: true,
                company: getCompanyDetails,
                contactList: getContactsOfCompany,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Company not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while fetching by ID", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch company details",
        });
    }
});
exports.fetchCompanyByID = fetchCompanyByID;
