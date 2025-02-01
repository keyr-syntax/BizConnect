import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Trash2, Pencil, Check, X } from "lucide-react";
import { companyStateStore } from "@/store/GlobalState";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./loading";

export default function DisplayTable() {
  const {
    company_list,
    FetchallCompanies,
    companyName,
    companyAddress,
    companyWebsite,
    companyCategory,
    companyID,
    UpdateCompanyData,
    DeleteCompany,
    FetchCompanyDataForEditing,
    loading,
  } = companyStateStore();
  const navigate = useNavigate();
  useEffect(() => {
    FetchallCompanies();
  }, [FetchallCompanies]);
  const companyData = {
    companyName: companyName,
    companyAddress: companyAddress,
    companyWebsite: companyWebsite,
    companyCategory: companyCategory,
  };
  return (
    <>
      {loading && <Loading />}
      {!loading && company_list && company_list.length > 0 && (
        <Table className="text-white mt-[80px] border border-solid border-[rgb(255,255,255,0.2)]  w-[95%]">
          <TableHeader>
            <TableRow className="border border-solid border-[rgb(255,255,255,0.2)]">
              <TableHead>Company Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {company_list &&
              company_list.length > 0 &&
              company_list.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">
                    {companyID !== null && companyID === company.id ? (
                      <Textarea
                        title="name"
                        className="text-white text-md"
                        value={companyName}
                        onChange={(e) => {
                          companyStateStore.setState({
                            companyName: e.target.value,
                          });
                        }}
                      />
                    ) : (
                      <span>{company.companyName}</span>
                    )}
                  </TableCell>

                  <TableCell>
                    {" "}
                    {companyID !== null && companyID === company.id ? (
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
                      <span>{company.companyAddress}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {companyID !== null && companyID === company.id ? (
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
                      <span>{company.companyWebsite}</span>
                    )}{" "}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {companyID !== null && companyID === company.id ? (
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
                      <span>{company.companyCategory}</span>
                    )}{" "}
                  </TableCell>

                  <TableCell className="flex flex-row items-center justify-center mt-2 gap-4">
                    {companyID !== null && companyID === company.id ? (
                      <Check
                        onClick={() => {
                          if (companyID) {
                            UpdateCompanyData(companyID, companyData);
                          }
                        }}
                        size={32}
                        className="cursor-pointer text-green-700"
                      />
                    ) : (
                      <>
                        <Link to={`/view_details/${company.id}`}>
                          <Eye size={28} className="cursor-pointer" />
                        </Link>
                        <Pencil
                          onClick={() => {
                            FetchCompanyDataForEditing(company.id);
                          }}
                          size={28}
                          className="cursor-pointer"
                        />
                      </>
                    )}
                    {companyID !== null && companyID === company.id ? (
                      <X
                        onClick={() => {
                          companyStateStore.setState({ companyID: null });
                        }}
                        size={32}
                        className="cursor-pointer text-red-700"
                      />
                    ) : (
                      <Trash2
                        onClick={() => {
                          if (company.id) {
                            DeleteCompany(company.id, navigate);
                          }
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
      {!loading && company_list && company_list.length === 0 && (
        <p className="my-[20%] text-white text-[20px] mx-auto text-center">
          No Company data found
        </p>
      )}
    </>
  );
}
