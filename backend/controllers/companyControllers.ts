import { Request, Response } from "express";
import COMPANY_LIST from "../models/companyModel";
import CONTACT_LIST from "../models/contactModel";

export const createCompanyDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    companyName,
    companyAddress,
    companyWebsite,
    companyCategory,
    isDraft,
  } = req.body;
  console.log("Body", req.body);
  if (
    !companyName ||
    companyName.trim() === "" ||
    !companyAddress ||
    companyAddress.trim() === "" ||
    !companyCategory ||
    companyCategory.trim() === ""
  ) {
    res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
    return;
  }

  const doesCompanyExist = await COMPANY_LIST.findOne({
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
    const newCompany = await COMPANY_LIST.create({
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
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to create company",
      });
      return;
    }
  } catch (error) {
    console.log("Error while creating company", error);
    res.status(500).json({
      success: false,
      message: "Failed to create company",
    });
  }
};
export const updateCompanyDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    companyName,
    companyAddress,
    companyWebsite,
    companyCategory,
    isDraft,
  } = req.body;

  if (
    !companyName ||
    companyName.trim() === "" ||
    !companyAddress ||
    companyAddress.trim() === "" ||
    !companyCategory ||
    companyCategory.trim() === ""
  ) {
    res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
    return;
  }

  try {
    const findCompanyByID = await COMPANY_LIST.findByPk(id);

    if (findCompanyByID) {
      const updateCompany = await findCompanyByID.update({
        companyName,
        companyAddress,
        companyWebsite: companyWebsite || null,
        companyCategory,
        isDraft,
      });
      const findContactsByCompanyID = await CONTACT_LIST.findAll({
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
    } else {
      const newCompany = await COMPANY_LIST.create({
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
  } catch (error) {
    console.log("Error while updating company", error);
    res.status(500).json({
      success: false,
      message: "Failed to update company",
    });
  }
};
export const findAllCompanies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allCompanies = await COMPANY_LIST.findAll();

    if (allCompanies) {
      res.status(200).json({
        success: true,
        company: allCompanies,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "No company found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while fetching companies", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch company list",
    });
  }
};
export const deleteCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const findCompanyByPK = await COMPANY_LIST.findByPk(id);

    if (findCompanyByPK) {
      const deleteCompanyDetails = await findCompanyByPK.destroy();
      res.status(200).json({
        success: true,
        message: "Company deleted",
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Company not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while deleting company", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete company",
    });
  }
};
export const fetchCompanyByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getCompanyDetails = await COMPANY_LIST.findByPk(id);
    const getContactsOfCompany = await CONTACT_LIST.findAll({
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
    } else {
      res.status(404).json({
        success: false,
        message: "Company not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while fetching by ID", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch company details",
    });
  }
};
