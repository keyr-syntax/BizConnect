import { Route, Routes } from "react-router-dom";
import DisplayTable from "./components/ui/DisplayTable";
import Navbar from "./components/ui/Navbar";
import { AddCompany } from "./components/ui/AddCompany";
import ViewDetails from "./components/ui/ViewDetails";
import CompanyTable from "./components/ui/TestFile";
import ContactList from "./components/ui/ContactList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<DisplayTable />} />
          <Route path="/add_company" element={<AddCompany />} />
          <Route path="/view_details/:id" element={<ViewDetails />} />
          <Route path="/test" element={<CompanyTable />} />
          <Route path="/all_contacts" element={<ContactList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
