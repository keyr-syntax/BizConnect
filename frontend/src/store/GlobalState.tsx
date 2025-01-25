import { create } from "zustand";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const BACKEND_API = "http://localhost:5000";

interface COMPANY {
  id: number;
  companyName: string;
  companyAddress: string;
  companyWebsite: string;
  companyCategory: string;
}

interface CONTACT {
  id: number;
  contactName: string;
  email: string;
  phone: number;
  role: string;
  companyID: number;
  companyName: string;
}

interface COMPANY_API_RESPONSE {
  success?: boolean;
  message?: "string";
  FetchallCompanies: () => Promise<void>;
  company_list?: COMPANY[];
  company?: COMPANY;
  contactList?: CONTACT[];
  FetchCompanyByID: (
    id: string,
    navigate: ReturnType<typeof useNavigate>
  ) => Promise<void>;
  FetchCompanyDataForEditing: (id: string | number) => Promise<void>;
  companyName?: string;
  companyAddress?: string;
  companyCategory?: string;
  companyWebsite?: string;
  companyID?: number | null;
  UpdateCompanyData: (
    id: number,
    companyData: {
      companyName?: string;
      companyAddress?: string;
      companyWebsite?: string;
      companyCategory?: string;
    }
  ) => Promise<void>;
  DeleteCompany: (
    id: string | number,
    navigate: ReturnType<typeof useNavigate>
  ) => Promise<void>;
}

export const companyStateStore = create<COMPANY_API_RESPONSE>((set) => ({
  company_list: [],
  companyID: null,

  FetchallCompanies: async () => {
    try {
      const data = await fetch(`${BACKEND_API}/company/all_companies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      if (response.success) {
        set({
          company_list: response.company,
        });
      } else {
        set({
          company_list: [],
        });
        if (response.message) {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.log("Error while fetching companies", error);
    }
  },

  FetchCompanyByID: async (
    id: string,
    navigate: ReturnType<typeof useNavigate>
  ) => {
    try {
      const data = await fetch(`${BACKEND_API}/company/fetch_company/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      if (response.success) {
        set({
          company: response.company,
          contactList: response.contactList,
          companyName: response.company.companyName,
          companyAddress: response.company.companyAddress,
          companyWebsite: response.company.companyWebsite,
          companyCategory: response.company.companyCategory,
          companyID: null,
        });
        console.log("company", response.company);
      } else {
        toast.error(response.message);
        navigate("/");
      }
    } catch (error) {
      console.log("Error while fetching company", error);
      toast.error("Failed to fetch company");
    }
  },
  FetchCompanyDataForEditing: async (id: string | number) => {
    try {
      const data = await fetch(`${BACKEND_API}/company/fetch_company/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      if (response.success) {
        set({
          companyName: response.company.companyName,
          companyAddress: response.company.companyAddress,
          companyWebsite: response.company.companyWebsite,
          companyCategory: response.company.companyCategory,
          companyID: response.company.id,
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error while fetching company", error);
      toast.error("Failed to fetch company");
    }
  },
  UpdateCompanyData: async (
    id: number,
    companyData: {
      companyName?: string;
      companyAddress?: string;
      companyWebsite?: string;
      companyCategory?: string;
    }
  ) => {
    try {
      const data = await fetch(`${BACKEND_API}/company/update_company/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: companyData.companyName,
          companyAddress: companyData.companyAddress,
          companyWebsite: companyData.companyWebsite,
          companyCategory: companyData.companyCategory,
        }),
      });
      const response = await data.json();
      if (response.success) {
        set({
          company: response.company,
          contactList: response.contactList,
          companyName: response.company.companyName,
          companyAddress: response.company.companyAddress,
          companyWebsite: response.company.companyWebsite,
          companyCategory: response.company.companyCategory,
          companyID: null,
        });
        await companyStateStore.getState().FetchallCompanies();
        toast.success("Data saved");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error while fetching company", error);
      toast.error("Failed to fetch company");
    }
  },
  DeleteCompany: async (id, navigate: ReturnType<typeof useNavigate>) => {
    if (window.confirm("Are you sure?")) {
      try {
        const data = await fetch(
          `${BACKEND_API}/company/delete_company/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = await data.json();

        if (response.success) {
          toast.success("Company deleted");
          set({ companyID: null });
          await companyStateStore.getState().FetchallCompanies();
          navigate("/");
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.log("Error while deleting company", error);

        toast.error("Failed to delete company");
      }
    }
  },
}));

interface CONTACT_API_RESPONSE {
  success?: boolean;
  message?: "string";
  company_list?: COMPANY[];
  allContactsList?: CONTACT[];
  contactForEdit?: CONTACT;
  FetchContactByID: (id: number | string) => Promise<void>;
  FetchAllContacts: () => Promise<void>;
  DeleteContact: (id: number) => Promise<void>;
  UpdateContactDetails: (
    id: number,
    contactDetails: {
      contactName?: string;
      companyName?: string;
      phone?: number;
      email?: string;
      role?: string;
      companyID?: number;
    }
  ) => Promise<void>;
  oneContactFetchedByID?: CONTACT;
  contactID?: number | null;
  contactName?: string;
  companyName?: string;
  phone?: number;
  email?: string;
  role?: string;
  companyID?: number;
}

export const contactStore = create<CONTACT_API_RESPONSE>((set) => ({
  allContactsList: [],
  contactID: null,

  FetchContactByID: async (id: number | string) => {
    try {
      const data = await fetch(`${BACKEND_API}/contact/get_contact/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();

      if (response.success) {
        set({
          oneContactFetchedByID: response.contact,
          contactID: response.contact.id,
          contactName: response.contact.contactName,
          companyName: response.contact.companyName,
          phone: response.contact.phone,
          email: response.contact.email,
          role: response.contact.role,
          companyID: response.contact.companyID,
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error while fetching contact", error);
      toast.error("Failed to edit contact");
    }
  },

  FetchAllContacts: async () => {
    try {
      const data = await fetch(`${BACKEND_API}/contact/all_contacts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      if (response.success) {
        set({
          allContactsList: response.contact,
        });
        console.log("allContactsList", response.contact);
      } else {
        set({
          allContactsList: [],
        });
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error while fetching contacts", error);
    }
  },

  UpdateContactDetails: async (
    id: number,
    contactDetails: {
      contactName?: string;
      companyName?: string;
      phone?: number;
      email?: string;
      role?: string;
      companyID?: number;
    }
  ) => {
    try {
      const data = await fetch(`${BACKEND_API}/contact/update_contact/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactName: contactDetails.contactName,
          companyName: contactDetails.companyName,
          phone: contactDetails.phone,
          email: contactDetails.email,
          role: contactDetails.role,
          companyID: contactDetails.companyID,
        }),
      });
      const response = await data.json();
      if (response.success) {
        set({
          contactID: null,
        });

        await contactStore.getState().FetchAllContacts();
        toast.success("Data saved");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error while fetching company", error);
      toast.error("Failed to fetch company");
    }
  },

  DeleteContact: async (id: number) => {
    if (window.confirm("Are you sure?")) {
      try {
        const data = await fetch(
          `${BACKEND_API}/contact/delete_contact/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = await data.json();

        if (response.success) {
          toast.success("Contact deleted");
          await contactStore.getState().FetchAllContacts();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.log("Error while deleting contact", error);

        toast.error("Failed to delete contact");
      }
    }
  },
}));
