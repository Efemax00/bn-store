import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { getProducts } from "../services/productService";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getProducts();

      // Handles both:
      // res.json(products)
      // res.json({ success: true, data: products })
      setProducts(Array.isArray(data) ? data : data?.data ?? []);
    } catch (err) {
      console.error("Failed to load admin products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  function nextNumber() {
    return `N°${String(products.length + 1).padStart(2, "0")}`;
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        fetchProducts,
        loading,
        nextNumber,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);

  if (!ctx) {
    throw new Error("useProducts must be used inside ProductsProvider");
  }

  return ctx;
}