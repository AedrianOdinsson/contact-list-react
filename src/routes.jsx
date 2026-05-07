import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit" element={<EditContact />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
