import { Request, Response } from "express";
import CONTACT_LIST from "../models/contactModel";

export const createContactDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { contactName, role, phone, email, companyID, companyName } = req.body;

  if (
    !contactName ||
    contactName.trim() === "" ||
    !role ||
    role.trim() === "" ||
    !phone ||
    !email ||
    email.trim() === "" ||
    !companyID ||
    !companyName ||
    companyName.trim() === ""
  ) {
    res.status(400).json({
      success: false,
      message: "Please fill required fields",
    });
    return;
  }

  const doesContactExist = await CONTACT_LIST.findOne({
    where: {
      contactName: contactName,
      role: role,
      phone: phone,
      email: email,
      companyID: companyID,
    },
  });
  if (doesContactExist) {
    const fetchAllContactsByCompanyID = await CONTACT_LIST.findAll({
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
    const newContact = await CONTACT_LIST.create({
      contactName,
      role,
      phone,
      email,
      companyID,
      companyName,
    });
    const fetchAllContactsByCompanyID = await CONTACT_LIST.findAll({
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
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to create contact",
      });
      return;
    }
  } catch (error) {
    console.log("Error while creating contact", error);
    res.status(500).json({
      success: false,
      message: "Failed to create contact",
    });
  }
};
export const updateContactDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { contactName, role, phone, email, companyID, companyName } = req.body;

  if (
    !contactName ||
    contactName.trim() === "" ||
    !role ||
    role.trim() === "" ||
    !phone ||
    !email ||
    email.trim() === "" ||
    !companyID ||
    !companyName ||
    companyName.trim() === ""
  ) {
    res.status(400).json({
      success: false,
      message: "Please fill required fields",
    });
    return;
  }

  try {
    const findContactByID = await CONTACT_LIST.findByPk(id);

    if (findContactByID) {
      const updateContact = await findContactByID.update({
        contactName,
        role,
        phone,
        email,
        companyID,
        companyName,
      });
      const fetchAllContactsByCompanyID = await CONTACT_LIST.findAll({
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
    } else {
      res.status(404).json({
        success: false,
        message: "Failed to update contact",
      });
      return;
    }
  } catch (error) {
    console.log("Error while updating contact", error);
    res.status(500).json({
      success: false,
      message: "Failed to update contact",
    });
  }
};
export const findAllContacts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allContacts = await CONTACT_LIST.findAll();

    if (allContacts) {
      res.status(200).json({
        success: true,
        contact: allContacts,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "No contact found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while fetching contacts", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact list",
    });
  }
};
export const deleteContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, ID } = req.params;

  try {
    const findContactByPK = await CONTACT_LIST.findByPk(id);
    if (findContactByPK) {
      await findContactByPK.destroy();
      const fetchAllContactsByCompanyID = await CONTACT_LIST.findAll({
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
    } else {
      res.status(404).json({
        success: false,
        message: "Contact not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while deleting contact", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete contact",
    });
  }
};
export const fetchContactByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const findByID = await CONTACT_LIST.findByPk(id);
    if (findByID) {
      res.status(200).json({
        success: true,
        contact: findByID,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Contact not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while fetching contact by ID", Error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact",
    });
  }
};
export const deleteContactAndFetchContactList = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  const companyID = req.params.companyID;
  try {
    const findContactByPK = await CONTACT_LIST.findByPk(id);

    if (findContactByPK) {
      await findContactByPK.destroy();
      const fetchAllContactsByCompanyID = await CONTACT_LIST.findAll({
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
    } else {
      res.status(404).json({
        success: false,
        message: "Contact not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while deleting contact", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete contact",
    });
  }
};
