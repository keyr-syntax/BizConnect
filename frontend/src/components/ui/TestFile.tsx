import React, { useState } from "react";

interface Company {
  id: number;
  name: string;
  industry: string;
}

const CompanyTable: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([
    { id: 1, name: "Company A", industry: "Finance" },
    { id: 2, name: "Company B", industry: "Technology" },
    { id: 3, name: "Company C", industry: "Healthcare" },
  ]);

  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Company | null>(null);

  const handleEditClick = (company: Company) => {
    setEditRowId(company.id);
    setEditData({ ...company });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editData) {
      setEditData({ ...editData, [e.target.name]: e.target.value });
    }
  };

  const handleSaveClick = () => {
    if (editData) {
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company.id === editData.id ? editData : company
        )
      );
      setEditRowId(null);
      setEditData(null);
    }
  };

  const handleCancelClick = () => {
    setEditRowId(null);
    setEditData(null);
  };

  return (
    <div className="p-4">
      <table className="table-auto border-collapse border border-gray-300 w-full mt-[80px]">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Industry</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {companies.map((company) => (
            <tr key={company.id}>
              <td className="border border-gray-300 px-4 py-2">{company.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {editRowId === company.id ? (
                  <input
                    title="edit"
                    type="text"
                    name="name"
                    value={editData?.name || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-2 py-1 w-full text-black"
                  />
                ) : (
                  company.name
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editRowId === company.id ? (
                  <input
                    title="edit"
                    type="text"
                    name="industry"
                    value={editData?.industry || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-2 py-1 w-full text-black"
                  />
                ) : (
                  company.industry
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editRowId === company.id ? (
                  <>
                    <button
                      onClick={handleSaveClick}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEditClick(company)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
