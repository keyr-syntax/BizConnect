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
exports.deleteContactAndFetchContactList = exports.fetchContactByID = exports.deleteContact = exports.findAllContacts = exports.updateContactDetails = exports.createContactDetails = void 0;
const contactModel_1 = __importDefault(require("../models/contactModel"));
const createContactDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactName, role, phone, email, companyID, companyName } = req.body;
    if (!contactName ||
        contactName.trim() === "" ||
        !role ||
        role.trim() === "" ||
        !phone ||
        !email ||
        email.trim() === "" ||
        !companyID ||
        !companyName ||
        companyName.trim() === "") {
        res.status(400).json({
            success: false,
            message: "Please fill required fields",
        });
        return;
    }
    const doesContactExist = yield contactModel_1.default.findOne({
        where: {
            contactName: contactName,
            role: role,
            phone: phone,
            email: email,
            companyID: companyID,
        },
    });
    if (doesContactExist) {
        const fetchAllContactsByCompanyID = yield contactModel_1.default.findAll({
            where: {
                companyID: companyID,
            },
        });
        res.status(400).json({
            success: true,
            message: "Company already exists",
            contact: doesContactExist,
            allContacts: fetchAllContactsByCompanyID,
        });
        return;
    }
    try {
        const newContact = yield contactModel_1.default.create({
            contactName,
            role,
            phone,
            email,
            companyID,
            companyName,
        });
        const fetchAllContactsByCompanyID = yield contactModel_1.default.findAll({
            where: {
                companyID: companyID,
            },
        });
        if (newContact) {
            res.status(201).json({
                success: true,
                contact: newContact,
                allContacts: fetchAllContactsByCompanyID,
            });
            return;
        }
        else {
            res.status(400).json({
                success: false,
                message: "Failed to create contact",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while creating contact", error);
        res.status(500).json({
            success: false,
            message: "Failed to create contact",
        });
    }
});
exports.createContactDetails = createContactDetails;
const updateContactDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { contactName, role, phone, email, companyID, companyName } = req.body;
    if (!contactName ||
        contactName.trim() === "" ||
        !role ||
        role.trim() === "" ||
        !phone ||
        !email ||
        email.trim() === "" ||
        !companyID ||
        !companyName ||
        companyName.trim() === "") {
        res.status(400).json({
            success: false,
            message: "Please fill required fields",
        });
        return;
    }
    try {
        const findContactByID = yield contactModel_1.default.findByPk(id);
        if (findContactByID) {
            const updateContact = yield findContactByID.update({
                contactName,
                role,
                phone,
                email,
                companyID,
                companyName,
            });
            const fetchAllContactsByCompanyID = yield contactModel_1.default.findAll({
                where: {
                    companyID: companyID,
                },
            });
            res.status(200).json({
                success: true,
                contact: updateContact,
                allContacts: fetchAllContactsByCompanyID,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Failed to update contact",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while updating contact", error);
        res.status(500).json({
            success: false,
            message: "Failed to update contact",
        });
    }
});
exports.updateContactDetails = updateContactDetails;
const findAllContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allContacts = yield contactModel_1.default.findAll();
        if (allContacts) {
            res.status(200).json({
                success: true,
                contact: allContacts,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "No contact found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while fetching contacts", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch contact list",
        });
    }
});
exports.findAllContacts = findAllContacts;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, ID } = req.params;
    try {
        const findContactByPK = yield contactModel_1.default.findByPk(id);
        if (findContactByPK) {
            yield findContactByPK.destroy();
            const fetchAllContactsByCompanyID = yield contactModel_1.default.findAll({
                where: {
                    companyID: ID,
                },
            });
            res.status(200).json({
                success: true,
                message: "Contact deleted",
                allContacts: fetchAllContactsByCompanyID,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Contact not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while deleting contact", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete contact",
        });
    }
});
exports.deleteContact = deleteContact;
const fetchContactByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const findByID = yield contactModel_1.default.findByPk(id);
        if (findByID) {
            res.status(200).json({
                success: true,
                contact: findByID,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Contact not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while fetching contact by ID", Error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch contact",
        });
    }
});
exports.fetchContactByID = fetchContactByID;
const deleteContactAndFetchContactList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const companyID = req.params.companyID;
    try {
        const findContactByPK = yield contactModel_1.default.findByPk(id);
        if (findContactByPK) {
            yield findContactByPK.destroy();
            const fetchAllContactsByCompanyID = yield contactModel_1.default.findAll({
                where: {
                    companyID: companyID,
                },
            });
            res.status(200).json({
                success: true,
                message: "Contact deleted",
                allContacts: fetchAllContactsByCompanyID,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Contact not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while deleting contact", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete contact",
        });
    }
});
exports.deleteContactAndFetchContactList = deleteContactAndFetchContactList;
