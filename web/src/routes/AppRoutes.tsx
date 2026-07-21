import { Routes, Route } from "react-router-dom";

import ClientLayout from "../layouts/ClientLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/client/Home";
import Products from "../pages/client/Products";
import ProductDetail from "../pages/client/ProductDetail";
import Contact from "../pages/client/Contact";

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";

function AppRoutes() {
  return (
    <Routes>

      {/* CLIENTE */}

      <Route element={<ClientLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/productos"
          element={<Products />}
        />

        <Route
          path="/productos/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/contacto"
          element={<Contact />}
        />

      </Route>

      {/* ADMIN */}

      <Route element={<AdminLayout />}>

        <Route
          path="/admin"
          element={<Login />}
        />

        <Route
          path="/admin/dashboard"
          element={<Dashboard />}
        />

      </Route>

    </Routes>
  );
}

export default AppRoutes;