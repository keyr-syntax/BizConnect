import { BACKEND_API } from "@/store/GlobalState";
import toast from "react-hot-toast";
import { companyStateStore } from "@/store/GlobalState";
import { useNavigate } from "react-router-dom";

interface COMPANY_DATA {
  companyName: string;
  companyAddress: string;
  companyWebsite: string;
  companyCategory: string;
  companyContacts: string[];
  companyPhone: number[];
  email: string[];
  roleList: string[];
}

interface FetchResponse {
  success: boolean;
  message: string;
}

export const handleCreateCompanyDetails = async (
  // e: React.FormEvent<HTMLFormElement>,
  companyData: COMPANY_DATA,
  navigate: ReturnType<typeof useNavigate>
): Promise<void> => {
  const { FetchallCompanies } = companyStateStore();
  // e.preventDefault();
  try {
    const data: Response = await fetch(
      `${BACKEND_API}/company/create_company`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: companyData.companyName,
          companyAddress: companyData.companyAddress,
          companyWebsite: companyData.companyWebsite,
          companyCategory: companyData.companyCategory,
          companyContacts: companyData.companyContacts,
          companyPhone: companyData.companyPhone,
          roleList: companyData.roleList,
          email: companyData.email,
        }),
      }
    );
    const response: FetchResponse = await data.json();
    if (response.success) {
      toast.success("Company data added");
      FetchallCompanies();
      navigate("/");
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.log("Error while creating company details", error);
    toast.error("Failed to add company data");
  }
};

