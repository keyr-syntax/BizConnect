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
  loading?: boolean;
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
  loading: false,

  FetchallCompanies: async () => {
    try {
      set({ loading: true });
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
          loading: false,
        });
      } else {
        set({
          company_list: [],
          loading: false,
        });
        if (response.message) {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.log("Error while fetching companies", error);
      set({ loading: false });
    }
  },

  FetchCompanyByID: async (
    id: string,
    navigate: ReturnType<typeof useNavigate>
  ) => {
    try {
      set({ loading: true });
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
          loading: false,
        });
        console.log("company", response.company);
      } else {
        set({ loading: false });
        toast.error(response.message);
        navigate("/");
        contactStore.setState({
          COMPANY_ID: null,
        });
      }
    } catch (error) {
      console.log("Error while fetching company", error);
      toast.error("Failed to fetch company");
      set({ loading: false });
    }
  },
  FetchCompanyDataForEditing: async (id: string | number) => {
    try {
      set({ loading: true });
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
          loading: false,
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error while fetching company", error);
      toast.error("Failed to fetch company");
      set({ loading: false });
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
      set({ loading: true });
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
          loading: false,
        });
        await companyStateStore.getState().FetchallCompanies();
        toast.success("Data saved");
      } else {
        toast.error(response.message);
        set({ loading: false });
      }
    } catch (error) {
      console.log("Error while fetching company", error);
      toast.error("Failed to fetch company");
      set({ loading: false });
    }
  },
  DeleteCompany: async (id, navigate: ReturnType<typeof useNavigate>) => {
    if (window.confirm("Are you sure?")) {
      try {
        set({ loading: true });
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
          set({ loading: false });
        }
      } catch (error) {
        console.log("Error while deleting company", error);

        toast.error("Failed to delete company");
        set({ loading: false });
      }
    }
  },
}));

interface CONTACT_API_RESPONSE {
  loading?: boolean;
  success?: boolean;
  message?: "string";
  company_list?: COMPANY[];
  allContactsList?: CONTACT[];
  contactForEdit?: CONTACT;
  FetchContactByID: (id: number | string) => Promise<void>;
  FetchAllContacts: () => Promise<void>;
  DeleteContact: (id: number, ID: number) => Promise<void>;
  UpdateContactDetails: (
    id: number,
    contactDetails: {
      contactName?: string | null;
      companyName?: string | null;
      phone?: number | null;
      email?: string | null;
      role?: string | null;
      companyID?: number | string;
    }
  ) => Promise<void>;
  oneContactFetchedByID?: CONTACT;
  contactID?: number | null;
  contactName?: string | null;
  companyName?: string | null;
  phone?: number | null;
  email?: string | null;
  role?: string | null;
  companyID?: number | null;
  CreateContact?: (contactDetails: {
    contactName?: string | null;
    companyName?: string | null;
    phone?: number | null;
    email?: string | null;
    role?: string | null;
    companyID?: string | null;
  }) => Promise<void>;
  COMPANY_ID?: string | null;
  COMPANY_NAME?: string | null;
  NullifyCompanyID?: () => Promise<void>;
}

export const contactStore = create<CONTACT_API_RESPONSE>((set) => ({
  allContactsList: [],
  contactID: null,
  loading: false,
  COMPANY_ID: null,
  COMPANY_NAME: null,

  FetchContactByID: async (id: number | string) => {
    try {
      set({ loading: true });
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
          COMPANY_NAME: response.contact.companyName,
          phone: response.contact.phone,
          email: response.contact.email,
          role: response.contact.role,
          companyID: response.contact.companyID,
          loading: false,
        });
      } else {
        toast.error(response.message);
        set({
          contactID: null,
          loading: false,
          contactName: null,
          companyName: null,
          phone: null,
          email: null,
          role: null,
          COMPANY_ID: null,
        });
      }
    } catch (error) {
      console.log("Error while fetching contact", error);
      toast.error("Failed to edit contact");
      set({
        contactID: null,
        loading: false,
        contactName: null,
        companyName: null,
        phone: null,
        email: null,
        role: null,
        COMPANY_ID: null,
      });
    }
  },
  FetchAllContacts: async () => {
    try {
      set({ loading: true });
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
          loading: false,
          contactID: null,
          contactName: null,
          companyName: null,
          phone: null,
          email: null,
          role: null,
          COMPANY_ID: null,
        });
        console.log("allContactsList", response.contact);
      } else {
        set({
          allContactsList: [],
          contactID: null,
          loading: false,
          contactName: null,
          companyName: null,
          phone: null,
          email: null,
          role: null,
          COMPANY_ID: null,
        });
        toast.error(response.message);
        set({
          contactID: null,
          loading: false,
          contactName: null,
          companyName: null,
          phone: null,
          email: null,
          role: null,
          COMPANY_ID: null,
        });
      }
    } catch (error) {
      console.log("Error while fetching contacts", error);
      set({
        contactID: null,
        loading: false,
        contactName: null,
        companyName: null,
        phone: null,
        email: null,
        role: null,
        COMPANY_ID: null,
      });
    }
  },
  UpdateContactDetails: async (
    id: number,
    contactDetails: {
      contactName?: string | null;
      companyName?: string | null;
      phone?: number | null;
      email?: string | null;
      role?: string | null;
      companyID?: number | string;
    }
  ) => {
    try {
      set({ loading: true });
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
          loading: false,
          contactName: null,
          companyName: null,
          phone: null,
          email: null,
          role: null,
          COMPANY_ID: null,
        });

        companyStateStore.setState({
          contactList: response.allContacts,
        });
        await contactStore.getState().FetchAllContacts();
        toast.success("Data saved");
      } else {
        toast.error(response.message);
        set({ loading: false });
      }
    } catch (error) {
      console.log("Error while fetching company", error);
      toast.error("Failed to fetch company");
      set({
        contactID: null,
        loading: false,
        contactName: null,
        companyName: null,
        phone: null,
        email: null,
        role: null,
        COMPANY_ID: null,
      });
    }
  },
  CreateContact: async (contactDetails: {
    contactName?: string | null;
    companyName?: string | null;
    phone?: number | null;
    email?: string | null;
    role?: string | null;
    companyID?: string | null;
  }) => {
    console.log("Create contact", contactDetails);
    try {
      set({ loading: true });
      const data: Response = await fetch(
        `${BACKEND_API}/contact/create_contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactName: contactDetails.contactName,
            role: contactDetails.role,
            email: contactDetails.email,
            companyID: contactDetails.companyID,
            companyName: contactDetails.companyName,
            phone: contactDetails.phone,
          }),
        }
      );
      const response = await data.json();
      if (response.success) {
        console.log("response.allContacts", response.allContacts);
        set({
          loading: false,
          contactName: null,
          companyName: null,
          phone: null,
          email: null,
          role: null,
          COMPANY_ID: null,
          contactID: null,
        });
        companyStateStore.setState({
          contactList: response.allContacts,
        });

        toast.success("Contact saved");
      } else {
        toast.error(response.message);
        set({
          loading: false,
          allContactsList: [],
        });
      }
    } catch (error) {
      console.log("Error while creating contact details", error);

      toast.error("Failed to add contact");
      set({
        loading: false,
        allContactsList: [],
        contactID: null,
        contactName: null,
        companyName: null,
        phone: null,
        email: null,
        role: null,
        COMPANY_ID: null,
      });
    }
  },
  DeleteContact: async (id: number, ID: number) => {
    if (window.confirm("Are you sure?")) {
      try {
        set({ loading: true });
        const data = await fetch(
          `${BACKEND_API}/contact/delete_contact/${id}/${ID}`,
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
          companyStateStore.setState({
            contactList: response.allContacts,
          });
          await contactStore.getState().FetchAllContacts();
          set({
            contactID: null,
            loading: false,
            contactName: null,
            companyName: null,
            phone: null,
            email: null,
            role: null,
            COMPANY_ID: null,
          });
          console.log("Delete response", response);
        } else {
          toast.error(response.message);
          set({
            contactID: null,
            loading: false,
            contactName: null,
            companyName: null,
            phone: null,
            email: null,
            role: null,
            COMPANY_ID: null,
          });
        }
      } catch (error) {
        console.log("Error while deleting contact", error);
        set({
          contactID: null,
          loading: false,
          contactName: null,
          companyName: null,
          phone: null,
          email: null,
          role: null,
          COMPANY_ID: null,
        });
        toast.error("Failed to delete contact");
      }
    }
  },
  NullifyCompanyID: async () => {
    set({ COMPANY_ID: null });
  },
}));
