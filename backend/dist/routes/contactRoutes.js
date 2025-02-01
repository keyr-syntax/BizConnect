"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const contactControllers_1 = require("../controllers/contactControllers");
router.post("/create_contact", contactControllers_1.createContactDetails);
router.put("/update_contact/:id", contactControllers_1.updateContactDetails);
router.get("/all_contacts", contactControllers_1.findAllContacts);
router.delete("/delete_contact/:id", contactControllers_1.deleteContact);
router.delete("/delete_contact/:id/:companyID", contactControllers_1.deleteContactAndFetchContactList);
router.get("/get_contact/:id", contactControllers_1.fetchContactByID);
exports.default = router;
