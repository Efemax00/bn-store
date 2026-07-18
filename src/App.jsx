import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import { StoreProductsProvider } from "./context/StoreProductsContext.jsx";
import { AdminProductsProvider } from "./context/AdminProductsContext.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";

import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Footer from "./components/Footer.jsx";

import CollectionPage from "./pages/CollectionPage.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import SalesDashboard from "./pages/SalesDashboard.jsx";

function Storefront() {
  return (
    <>
      <Nav />
      <Hero />
      <ProductGrid limit={8} />
      <HowItWorks />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ===================== PUBLIC STORE ===================== */}

          <Route
            path="/"
            element={
              <StoreProductsProvider>
                <Storefront />
              </StoreProductsProvider>
            }
          />

          <Route
            path="/collection"
            element={
              <StoreProductsProvider>
                <CollectionPage />
              </StoreProductsProvider>
            }
          />

          {/* ===================== ADMIN ===================== */}

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminProductsProvider>
                  <AdminDashboard />
                </AdminProductsProvider>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/sales"
            element={
              <ProtectedRoute>
                <AdminProductsProvider>
                  <SalesDashboard />
                </AdminProductsProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}