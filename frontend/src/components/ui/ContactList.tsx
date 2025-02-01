import { contactStore } from "@/store/GlobalState";
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
import { useEffect } from "react";
import Loading from "./loading";
export default function ContactList() {
  const {
    FetchAllContacts,
    allContactsList,
    contactName,
    contactID,
    companyName,
    phone,
    role,
    companyID,
    email,
    UpdateContactDetails,
    FetchContactByID,
    DeleteContact,
    loading,
  } = contactStore();
  const contactDetails = {
    contactName: contactName,
    companyName: companyName,
    phone: phone,
    email: email,
    role: role,
    companyID: companyID ?? undefined,
  };
  useEffect(() => {
    FetchAllContacts();
  }, [FetchAllContacts]);

  return (
    <>
      {loading && <Loading />}
      {!loading && allContactsList && allContactsList.length > 0 && (
        <Table className="text-white border border-solid border-[rgb(255,255,255,0.2)] w-[95%] mt-[80px]">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>

              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allContactsList.map((contact) => (
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
                      value={companyName ?? ""}
                      onChange={(e) => {
                        contactStore.setState({
                          companyName: e.target.value,
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
                          console.log("contactDetails", contactDetails);
                        }
                      }}
                      size={32}
                      className="cursor-pointer text-green-700"
                    />
                  ) : (
                    <Pencil
                      onClick={() => {
                        FetchContactByID(contact.id);
                      }}
                      size={28}
                      className="cursor-pointer"
                    />
                  )}
                  {contactID !== null && contactID === contact.id ? (
                    <X />
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
      {!loading && allContactsList && allContactsList.length === 0 && (
        <p className="my-[20%] text-white text-[20px] mx-auto text-center">
          No Contacts found
        </p>
      )}
    </>
  );
}
