import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import UsersList from "./pages/UsersList";
import UpdateUserRole from "./pages/UpdateUserRole";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
        </Route>

        {/* Admin-Only Routes */}
        <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/update/:id" element={<EditProduct />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/update-role/:id" element={<UpdateUserRole />} />
        </Route>

        {/* Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
