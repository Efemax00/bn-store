import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";

import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Footer from "./components/Footer.jsx";

import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import SalesDashboard from "./pages/SalesDashboard.jsx";

function Storefront() {
  return (
    <>
      <Nav />
      <Hero />
      <ProductGrid />
      <HowItWorks />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Storefront />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/sales"
              element={
                <ProtectedRoute>
                  <SalesDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ProductsProvider>
    </AuthProvider>
  );
}
