import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Contacts from "./pages/Contacts";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Todas las páginas comparten Layout */}
        <Route element={<Layout />}>

          {/* Página principal */}
          <Route path="/" element={<Contacts />} />

          {/* Lista de contactos */}
          <Route path="/contacts" element={<Contacts />} />

          {/* Añadir contacto */}
          <Route path="/add" element={<AddContact />} />

          {/* Editar contacto */}
          <Route path="/edit/:id" element={<EditContact />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
