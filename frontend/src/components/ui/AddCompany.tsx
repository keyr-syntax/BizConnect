import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { BACKEND_API } from "@/store/GlobalState";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

interface CONTACT_LIST {
  id: number;
  contactName: string;
  email: string[];
  phone: number[];
  role: string;
}

export function AddCompany({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [companyName, setcompanyName] = useState<string>("");
  const [companyAddress, setcompanyAddress] = useState<string>("");
  const [companyWebsite, setcompanyWebsite] = useState<string>("");
  const [companyCategory, setcompanyCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showContactForm, setshowContactForm] = useState<boolean>(false);
  const [showMoreContactBtn, setshowMoreContactBtn] = useState<boolean>(false);
  const [displayButtonForEdit, setdisplayButtonForEdit] =
    useState<boolean>(false);
  const [contact, setContact] = useState<string>("");
  const [phone, setPhone] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [companyID, setCompanyID] = useState<number | null>(null);
  const [contactID, setcontactID] = useState<number | null>(null);
  const [contactList, setContactList] = useState<CONTACT_LIST[]>([]);
  const [disableSaveCompanyBtn, setdisableSaveCompanyBtn] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const saveContact = async () => {
    try {
      setLoading(true);
      const data: Response = await fetch(
        `${BACKEND_API}/contact/create_contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactName: contact,
            role,
            email,
            companyID,
            companyName,
            phone,
          }),
        }
      );
      const response = await data.json();
      if (response.success) {
        setContactList(response.allContacts);
        console.log("response.allContacts", response.allContacts);
        toast.success("Contact saved");
        setshowContactForm(false);
        setshowMoreContactBtn(true);
        setLoading(false);
        setContact("");
        setEmail("");
        setPhone(null);
        setRole("");
      } else {
        toast.error(response.message);
        setLoading(false);
        setshowMoreContactBtn(false);
      }
    } catch (error) {
      console.log("Error while creating contact details", error);
      setLoading(false);
      setshowMoreContactBtn(false);
      toast.error("Failed to add contact");
    }
  };
  const saveCompanyDataAsDraft = async () => {
    try {
      setLoading(true);
      const data: Response = await fetch(
        `${BACKEND_API}/company/create_company`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyName,
            companyAddress,
            companyWebsite,
            companyCategory,
            isDraft: true,
          }),
        }
      );
      const response = await data.json();
      if (response.success) {
        toast.success("Draft saved");
        setCompanyID(response.company.id);
        setLoading(false);
        setshowContactForm(true);
        setdisableSaveCompanyBtn(true);
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error while creating company details", error);
      setLoading(false);
      setshowContactForm(false);
      toast.error("Failed to add company data");
    }
  };
  const saveCompanyAsDraft = async () => {
    try {
      setLoading(true);
      const data: Response = await fetch(
        `${BACKEND_API}/company/create_company`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyName,
            companyAddress,
            companyWebsite,
            companyCategory,
            isDraft: true,
          }),
        }
      );
      const response = await data.json();
      if (response.success) {
        toast.success("Company data saved");
        setCompanyID(response.company.id);
        setLoading(false);
        setshowContactForm(false);
        setdisableSaveCompanyBtn(true);
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error while creating company details", error);
      setLoading(false);
      setshowContactForm(false);
      toast.error("Failed to add company data");
    }
  };
  const fetchContactByID = async (id: number) => {
    try {
      const data = await fetch(`${BACKEND_API}/contact/get_contact/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();

      if (response.success) {
        setContact(response.contact.contactName);
        setRole(response.contact.role);
        setPhone(response.contact.phone);
        setEmail(response.contact.email);
        setcontactID(response.contact.id);
        toast.success("Contact ready for editing");
        setshowContactForm(true);
        setshowMoreContactBtn(false);
        setdisplayButtonForEdit(true);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error while fetching contact", error);
      toast.error("Failed to edit contact");
    }
  };
  const editContact = async (id: number) => {
    try {
      setLoading(true);
      const data: Response = await fetch(
        `${BACKEND_API}/contact/update_contact/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactName: contact,
            role,
            email,
            companyID,
            companyName,
            phone,
          }),
        }
      );
      const response = await data.json();
      if (response.success) {
        setContactList(response.allContacts);
        console.log("response.allContacts", response.allContacts);
        toast.success("Contact updated");
        setshowContactForm(false);
        setshowMoreContactBtn(true);
        setdisplayButtonForEdit(false);
        setLoading(false);
        setContact("");
        setEmail("");
        setPhone(null);
        setRole("");
      } else {
        toast.error(response.message);
        setLoading(false);
        setshowMoreContactBtn(false);
      }
    } catch (error) {
      console.log("Error while creating contact details", error);
      setLoading(false);
      setshowMoreContactBtn(false);
      toast.error("Failed to add contact");
    }
  };
  const deleteContact = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      try {
        const data = await fetch(
          `${BACKEND_API}/contact/delete_contact/${id}/${companyID}`,
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
          setContactList(response.allContacts);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.log("Error while deleting contact", error);

        toast.error("Failed to delete contact");
      }
    }
  };
  const saveCompanyData = async (companyID: number) => {
    try {
      setLoading(true);
      const data: Response = await fetch(
        `${BACKEND_API}/company/update_company/${companyID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyName,
            companyAddress,
            companyWebsite,
            companyCategory,
            isDraft: false,
          }),
        }
      );
      const response = await data.json();
      if (response.success) {
        toast.success("Company data saved");
        setLoading(false);
        navigate("/");
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error while creating company details", error);
      setLoading(false);
      setshowContactForm(false);
      toast.error("Failed to add company data");
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-[#151533] mt-[80px] w-[95%] mx-auto max-w-[750px] text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-white text-center">
            Add Company Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col  sm:flex-row align-center justify-center gap-5">
                <div className="grid gap-2 w-full">
                  <Label className="text-md" htmlFor="company name">
                    Company name
                  </Label>
                  <Input
                    value={companyName}
                    onChange={(e) => {
                      setcompanyName(e.target.value);
                    }}
                    className="block sm:hidden"
                    id="company_name"
                    type="text"
                    placeholder="Company's name"
                    required
                  />
                  <Textarea
                    value={companyName}
                    onChange={(e) => {
                      setcompanyName(e.target.value);
                    }}
                    className="hidden sm:block"
                    id="company_name"
                    placeholder="Company's name"
                    required
                  />
                </div>
                <div className="grid gap-2 w-full">
                  <Label className="text-md" htmlFor="Company address">
                    Company address
                  </Label>
                  <Input
                    value={companyAddress}
                    onChange={(e) => {
                      setcompanyAddress(e.target.value);
                    }}
                    className="block sm:hidden"
                    id="company_address"
                    type="text"
                    placeholder="Write company's address"
                    required
                  />
                  <Textarea
                    value={companyAddress}
                    onChange={(e) => {
                      setcompanyAddress(e.target.value);
                    }}
                    className="hidden sm:block"
                    id="company_address"
                    placeholder="Company's address"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col  sm:flex-row align-center justify-center gap-5">
                <div className="grid gap-2 w-full">
                  <Label className="text-md" htmlFor="company website">
                    Company Website
                  </Label>
                  <Input
                    value={companyWebsite}
                    onChange={(e) => {
                      setcompanyWebsite(e.target.value);
                    }}
                    id="companyWebsite"
                    type="url"
                    placeholder="Company's website link"
                    required
                  />
                </div>
                <div className="grid gap-2 w-full">
                  <Label className="text-md" htmlFor="company category">
                    Industry
                  </Label>
                  <Input
                    value={companyCategory}
                    onChange={(e) => {
                      setcompanyCategory(e.target.value);
                    }}
                    id="companyCategory"
                    type="text"
                    placeholder="e.g Tech, Health, E-commerce"
                  />
                </div>
              </div>
              {contactList && contactList.length > 0 && (
                <Table className="text-white border border-solid w-full rounded-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contactList.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>{contact.contactName}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.role}</TableCell>
                        <TableCell className="flex flex-row items-center justify-center mt-2 gap-2">
                          <Pencil
                            onClick={() => {
                              fetchContactByID(contact.id);
                            }}
                            className="cursor-pointer"
                          />
                          <Trash2
                            onClick={() => {
                              deleteContact(contact.id);
                            }}
                            className="cursor-pointer"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {!showContactForm && !showMoreContactBtn && (
                <Button
                  onClick={() => {
                    saveCompanyDataAsDraft();
                  }}
                  type="button"
                  className="w-full bg-[#0D6EFD] text-lg hover:bg-[#0DEFD]"
                  disabled={loading}
                >
                  {loading ? "Saving data" : "Add Company's contact"}
                </Button>
              )}

              {showContactForm && (
                <>
                  <div className="block mx-auto text-lg">
                    Add Contact Person Info
                  </div>
                  <div className="flex flex-col  sm:flex-row align-center justify-center gap-5">
                    <div className="grid gap-2 w-full">
                      <div className="flex flex-row gap-1">
                        <Input
                          value={contact}
                          onChange={(e) => {
                            setContact(e.target.value);
                          }}
                          id="companyContacts"
                          type="text"
                          placeholder="Company's contact name"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-2 w-full">
                      <div className="flex flex-row gap-1">
                        <Input
                          value={phone ?? ""}
                          onChange={(e) => {
                            setPhone(Number(e.target.value));
                          }}
                          id="companyPhone"
                          type="tel"
                          placeholder="Contact's phone number"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col  sm:flex-row align-center justify-center gap-5">
                    <div className="grid gap-2 w-full">
                      <div className="flex flex-row gap-1">
                        <Input
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          id="email"
                          type="email"
                          placeholder="Contact's email"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-2 w-full">
                      <div className="flex flex-row gap-1">
                        <Input
                          value={role}
                          onChange={(e) => {
                            setRole(e.target.value);
                          }}
                          id="role"
                          type="text"
                          placeholder="Contact's role/position"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 justify-center mb-16 flex-wrap">
                    {!displayButtonForEdit && (
                      <Button
                        onClick={() => {
                          saveContact();
                        }}
                        type="submit"
                        className="block w-auto bg-[#0D6EFD] mt-5 px-5 text-lg hover:bg-[#0DEFD]"
                        disabled={loading}
                      >
                        {loading ? "Saving contact.." : "Save contact"}
                      </Button>
                    )}
                    {!displayButtonForEdit && (
                      <Button
                        onClick={() => {
                          setshowContactForm(false);
                        }}
                        type="submit"
                        className="block w-auto  text-lg hover:bg-red-800 mt-5 px-5 bg-red-800"
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-row gap-4 justify-center flex-wrap">
                    {displayButtonForEdit && (
                      <Button
                        onClick={() => {
                          if (contactID !== null) {
                            editContact(contactID);
                          }
                        }}
                        type="submit"
                        className="w-1/2 bg-[#0D6EFD] text-lg hover:bg-[#0DEFD]"
                        disabled={loading}
                      >
                        {loading ? "Updating contact.." : "Update contact"}
                      </Button>
                    )}
                    {displayButtonForEdit && (
                      <Button
                        onClick={() => {
                          if (contactID !== null) {
                            setcontactID(null);
                            setdisplayButtonForEdit(false);
                            setshowContactForm(false);
                          }
                        }}
                        type="submit"
                        className="w-1/2 bg-red-700 text-lg hover:bg-[#0DEFD]"
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </>
              )}
              {showMoreContactBtn && !showContactForm && (
                <Button
                  onClick={() => {
                    setshowContactForm(true);
                    setshowMoreContactBtn(false);
                  }}
                  type="submit"
                  className="w-full bg-[#0D6EFD] text-lg hover:bg-[#0DEFD]"
                >
                  Add more contact
                </Button>
              )}
              {!disableSaveCompanyBtn && (
                <Button
                  onClick={() => {
                    saveCompanyAsDraft();
                  }}
                  disabled={loading}
                  type="submit"
                  className="w-full bg-[#0D6EFD] text-lg hover:bg-[#0DEFD]"
                >
                  Save Company
                </Button>
              )}
              {disableSaveCompanyBtn && (
                <Button
                  onClick={() => {
                    if (companyID) {
                      saveCompanyData(companyID);
                    }
                  }}
                  disabled={loading}
                  type="submit"
                  className="w-full bg-[#0D6EFD] text-lg hover:bg-[#0DEFD]"
                >
                  Finish
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
