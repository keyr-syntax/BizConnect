import express, { Router } from "express";
const router: Router = express.Router();
import {
  createContactDetails,
  updateContactDetails,
  findAllContacts,
  deleteContact,
  fetchContactByID,
  deleteContactAndFetchContactList,
} from "../controllers/contactControllers";

router.post("/create_contact", createContactDetails);
router.put("/update_contact/:id", updateContactDetails);
router.get("/all_contacts", findAllContacts);
router.delete("/delete_contact/:id", deleteContact);
router.delete(
  "/delete_contact/:id/:companyID",
  deleteContactAndFetchContactList
);
router.get("/get_contact/:id", fetchContactByID);

export default router;
