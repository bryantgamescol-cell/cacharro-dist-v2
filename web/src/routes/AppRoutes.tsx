import { Routes, Route } from "react-router-dom";

import ClientLayout from "../layouts/ClientLayout";
import AdminLayout from "../layouts/AdminLayout";

import PrivateRoute from "../components/admin/PrivateRoute";

/* ================= CLIENTE ================= */

import Home from "../pages/client/Home";
import Products from "../pages/client/Products";
import ProductDetail from "../pages/client/ProductDetail";
import Contact from "../pages/client/Contact";

/* ================= ADMIN ================= */

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/Products";
import CreateProduct from "../pages/admin/CreateProduct";
import EditProduct from "../pages/admin/EditProduct";
import Categories from "../pages/admin/Categories";
import Brands from "../pages/admin/Brands";
import Suppliers from "../pages/admin/Suppliers";
import Inventory from "../pages/admin/Inventory";

function AppRoutes() {
  return (
    <Routes>

      {/* ================= CLIENTE ================= */}

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
      

      {/* ================= LOGIN ================= */}

      <Route
        path="/admin"
        element={<Login />}
      />

      {/* ================= ADMIN ================= */}

      <Route
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >

        <Route
          path="/admin/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/admin/products"
          element={<AdminProducts />}
        />

        <Route
          path="/admin/products/new"
          element={<CreateProduct />}
        />

        <Route
          path="/admin/products/:id/edit"
          element={<EditProduct />}
        />

        <Route
          path="/admin/categories"
          element={<Categories />}
        />

        <Route
          path="/admin/brands"
          element={<Brands />}
        />

        <Route
          path="/admin/suppliers"
          element={<Suppliers />}
        />

        <Route
          path="/admin/inventory"
          element={<Inventory />}
        />

      </Route>

    </Routes>
    
  );
}

export default AppRoutes;