import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // Updated import

import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./components/layout";
import RegistrationPage from "./pages/RegistrationPage";
import ProductPage from "./pages/ProductPage";
import OrdersPage from "./pages/OrderPage";

const App = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
