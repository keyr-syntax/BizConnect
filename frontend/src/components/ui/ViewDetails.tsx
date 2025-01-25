import { companyStateStore } from "@/store/GlobalState";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Pencil, Check, X } from "lucide-react";
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
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      FetchCompanyByID(id, navigate);
    }
  }, [FetchCompanyByID, id, navigate]);

  const companyData = {
    companyName: companyName,
    companyAddress: companyAddress,
    companyWebsite: companyWebsite,
    companyCategory: companyCategory,
  };

  return (
    <>
      {company && (
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
      {contactList && contactList.length > 0 && (
        <Table className="text-white border border-solid w-[95%] mt-10">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contactList.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.contactName}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.role}</TableCell>
                <TableCell className="flex flex-row items-center justify-center mt-2 gap-4">
                  <Pencil
                    // onClick={() => {
                    //   fetchContactByID(contact.id);
                    // }}
                    className="cursor-pointer"
                  />
                  <Trash2
                    // onClick={() => {
                    //   deleteContact(contact.id);
                    // }}
                    className="cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
