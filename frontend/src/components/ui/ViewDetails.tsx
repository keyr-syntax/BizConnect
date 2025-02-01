import { companyStateStore } from "@/store/GlobalState";
import { contactStore } from "@/store/GlobalState";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Pencil, Check, X } from "lucide-react";
import Loading from "./loading";
import { Input } from "./input";

export default function ViewDetails() {
  const {
    FetchCompanyByID,
    company,
    contactList,
    companyName,
    companyAddress,
    companyWebsite,
    companyCategory,
    companyID,
    UpdateCompanyData,
    DeleteCompany,
  } = companyStateStore();
  const {
    contactName,
    contactID,
    phone,
    role,
    COMPANY_ID,
    email,
    UpdateContactDetails,
    FetchContactByID,
    DeleteContact,
    loading,
    CreateContact,
    COMPANY_NAME,
    NullifyCompanyID,
  } = contactStore();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      FetchCompanyByID(id, navigate);
      if (NullifyCompanyID) {
        NullifyCompanyID();
      }
    }
  }, [FetchCompanyByID, id, navigate, NullifyCompanyID]);
  const contactDetails = {
    contactName: contactName,
    companyName: COMPANY_NAME,
    phone: phone,
    email: email,
    role: role,
    companyID: id,
  };

  const companyData = {
    companyName: companyName,
    companyAddress: companyAddress,
    companyWebsite: companyWebsite,
    companyCategory: companyCategory,
  };

  return (
    <>
      {loading && <Loading />}
      {!loading && company && (
        <Table className="text-white mt-[80px] border border-solid border-[rgb(255,255,255,0.2)] w-[95%]">
          <TableHeader>
            <TableRow className="border border-solid border-[rgb(255,255,255,0.2)]">
              <TableHead>Company Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                {companyID !== null ? (
                  <Textarea
                    title="name"
                    className="text-white text-md"
                    value={companyName}
                    onChange={(e) => {
                      companyStateStore.setState({
                        companyName: e.target.value,
                      });
                      console.log("Name", e.target.value);
                      console.log("companyName", companyName);
                    }}
                  />
                ) : (
                  <span>{company?.companyName}</span>
                )}
              </TableCell>
              <TableCell>
                {" "}
                {companyID !== null ? (
                  <Textarea
                    title="name"
                    className="text-white text-md"
                    value={companyAddress}
                    onChange={(e) => {
                      companyStateStore.setState({
                        companyAddress: e.target.value,
                      });
                    }}
                  />
                ) : (
                  <span>{company?.companyAddress}</span>
                )}
              </TableCell>
              <TableCell>
                {" "}
                {companyID !== null ? (
                  <Textarea
                    title="name"
                    className="text-white text-md"
                    value={companyWebsite}
                    onChange={(e) => {
                      companyStateStore.setState({
                        companyWebsite: e.target.value,
                      });
                    }}
                  />
                ) : (
                  <span>{company?.companyWebsite}</span>
                )}{" "}
              </TableCell>
              <TableCell>
                {" "}
                {companyID !== null ? (
                  <Textarea
                    title="name"
                    className="text-white text-md w-[150px]"
                    value={companyCategory}
                    onChange={(e) => {
                      companyStateStore.setState({
                        companyCategory: e.target.value,
                      });
                    }}
                  />
                ) : (
                  <span>{company?.companyCategory}</span>
                )}{" "}
              </TableCell>
              <TableCell className="flex flex-row items-center justify-center mt-2 gap-4">
                {companyID === null ? (
                  <Pencil
                    onClick={() => {
                      companyStateStore.setState({ companyID: company?.id });
                    }}
                    className="cursor-pointer"
                  />
                ) : (
                  <Check
                    onClick={() => {
                      if (companyID) {
                        UpdateCompanyData(companyID, companyData);
                      }
                    }}
                    className="cursor-pointer text-green-700"
                    size={32}
                  />
                )}
                {companyID === null ? (
                  <Trash2
                    onClick={() => {
                      if (id) {
                        DeleteCompany(id, navigate);
                      }
                    }}
                    className="cursor-pointer"
                  />
                ) : (
                  <X
                    onClick={() => {
                      companyStateStore.setState({ companyID: null });
                    }}
                    className="cursor-pointer text-red-700"
                    size={32}
                  />
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {/*  */}
      {/*  */}
      {/*  */}
      {!loading && contactList && contactList.length > 0 && (
        <Table className="text-white border border-solid border-[rgb(255,255,255,0.2)] w-[95%] mt-10">
          <TableHeader>
            <TableRow className="border border-solid border-[rgb(255,255,255,0.2)]">
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contactList.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  {contactID !== null && contactID === contact.id ? (
                    <Textarea
                      title="name"
                      className="text-white text-md"
                      value={contactName ?? ""}
                      onChange={(e) => {
                        contactStore.setState({
                          contactName: e.target.value,
                        });
                      }}
                    />
                  ) : (
                    <span>{contact.contactName}</span>
                  )}
                </TableCell>
                <TableCell>
                  {contactID !== null && contactID === contact.id ? (
                    <Textarea
                      title="company name"
                      className="text-white text-md"
                      value={COMPANY_NAME ?? ""}
                      onChange={(e) => {
                        contactStore.setState({
                          COMPANY_NAME: e.target.value,
                        });
                      }}
                    />
                  ) : (
                    <span>{contact.companyName}</span>
                  )}
                </TableCell>
                <TableCell>
                  {contactID !== null && contactID === contact.id ? (
                    <Textarea
                      value={role ?? ""}
                      onChange={(e) => {
                        contactStore.setState({
                          role: e.target.value,
                        });
                      }}
                    />
                  ) : (
                    <span>{contact.role}</span>
                  )}
                </TableCell>
                <TableCell>
                  {contactID !== null && contactID === contact.id ? (
                    <Textarea
                      value={phone ?? ""}
                      onChange={(e) => {
                        contactStore.setState({
                          phone: Number(e.target.value),
                        });
                      }}
                    />
                  ) : (
                    <span>{contact.phone}</span>
                  )}
                </TableCell>

                <TableCell>
                  {contactID !== null && contactID === contact.id ? (
                    <Textarea
                      value={email ?? ""}
                      onChange={(e) => {
                        contactStore.setState({
                          email: e.target.value,
                        });
                      }}
                    />
                  ) : (
                    <span>{contact.email}</span>
                  )}
                </TableCell>

                <TableCell className="flex flex-row items-center justify-center mt-2 gap-4">
                  {contactID !== null && contactID === contact.id ? (
                    <Check
                      onClick={() => {
                        if (contact.id) {
                          UpdateContactDetails(contact.id, contactDetails);
                        }
                      }}
                      size={32}
                      className="cursor-pointer text-green-700"
                    />
                  ) : (
                    <Pencil
                      onClick={() => {
                        FetchContactByID(contact.id);
                        contactStore.setState({
                          COMPANY_ID: null,
                        });
                      }}
                      size={28}
                      className="cursor-pointer"
                    />
                  )}
                  {contactID !== null && contactID === contact.id ? (
                    <X
                      size={28}
                      className="cursor-pointer text-red-700 "
                      onClick={() => {
                        contactStore.setState({ contactID: null });
                      }}
                    />
                  ) : (
                    <Trash2
                      onClick={() => {
                        DeleteContact(contact.id, contact.companyID);
                      }}
                      size={28}
                      className="cursor-pointer"
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {!loading && COMPANY_ID !== null && (
        <form action="">
          <div className="flex flex-col gap-4 w-[80%] max-w-[700px] mx-auto mt-[50px]">
            <div className="block mx-auto text-lg text-white">
              Add Contact Person Info
            </div>
            <div className="flex flex-col  sm:flex-row align-center justify-center gap-5">
              <div className="grid gap-2 w-full">
                <div className="flex flex-row gap-1">
                  <Input
                    className="text-white"
                    value={contactName ?? ""}
                    onChange={(e) => {
                      contactStore.setState({
                        contactName: e.target.value,
                        COMPANY_NAME: companyName,
                      });
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
                    className="text-white"
                    value={phone ?? ""}
                    onChange={(e) => {
                      contactStore.setState({
                        phone: Number(e.target.value),
                      });
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
                    className="text-white"
                    value={email ?? ""}
                    onChange={(e) => {
                      contactStore.setState({ email: e.target.value });
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
                    className="text-white"
                    value={role ?? ""}
                    onChange={(e) => {
                      contactStore.setState({ role: e.target.value });
                    }}
                    id="role"
                    type="text"
                    placeholder="Contact's role/position"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {!loading &&
        COMPANY_ID === null &&
        contactList &&
        contactList.length === 0 && (
          <p className="mt-[5%] text-white text-[20px] mx-auto text-center px-5">
            You haven't added contacts for {companyName}
          </p>
        )}
      {!loading && COMPANY_ID === null && (
        <Button
          onClick={() => {
            contactStore.setState({
              COMPANY_ID: id,
              contactID: null,
              contactName: "",
              companyName: "",
              COMPANY_NAME: "",
              phone: null,
              email: "",
              role: "",
              companyID: null,
              loading: false,
            });
          }}
          className="block w-auto bg-[#0D6EFD] text-lg hover:bg-[#0DEFD] mx-auto mt-5 p-2"
        >
          Add contact
        </Button>
      )}
      <div className="flex flex-row gap-4 justify-center mb-16 flex-wrap">
        {!loading && COMPANY_ID !== null && (
          <Button
            onClick={() => {
              if (CreateContact) {
                CreateContact(contactDetails);
              }
            }}
            type="submit"
            className="block w-auto bg-[#0D6EFD] text-lg hover:bg-[#0DEFD]  mt-5 p-2"
            disabled={loading}
          >
            {loading ? "Saving contact.." : "Save contact"}
          </Button>
        )}
        {!loading && COMPANY_ID !== null && (
          <Button
            onClick={() => {
              contactStore.setState({ COMPANY_ID: null });
            }}
            type="submit"
            className="block w-auto  text-lg hover:bg-[#0DEFD] mt-5 px-5 bg-red-800"
            disabled={loading}
          >
            Cancel
          </Button>
        )}
      </div>
    </>
  );
}
