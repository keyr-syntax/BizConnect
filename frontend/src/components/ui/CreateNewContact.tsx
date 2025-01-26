import { BACKEND_API } from "@/store/GlobalState";
import { useState } from "react";
import { Input } from "./input";

export default function CreateNewContact() {
  const [loading, setLoading] = useState<boolean>(false);
  const [contactName, setcontactName] = useState<string | null>(null);
  const [companyName, setcompanyName] = useState<string | null>(null);
  const [email, setemail] = useState<string | null>(null);
  const [role, setrole] = useState<string | null>(null);
  const [phone, setphone] = useState<number | null>(null);

  return (
    <>
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
    </>
  );
}
