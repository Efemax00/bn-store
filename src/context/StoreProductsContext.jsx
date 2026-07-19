import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { getStoreProducts } from "../services/productService";

const StoreProductsContext = createContext(null);

const CACHE_KEY = "store-products-cache";

export function StoreProductsProvider({ children }) {
  // Load cached products immediately
  const [products, setProducts] = useState(() => {
    const cached = localStorage.getItem(CACHE_KEY);

    if (!cached) return [];

    try {
      return JSON.parse(cached);
    } catch {
      return [];
    }
  });

  // Only show loading if no cache exists
  const [loading, setLoading] = useState(products.length === 0);

  const fetchProducts = useCallback(async () => {
    try {
      const freshProducts = await getStoreProducts();

      setProducts(freshProducts);

      // Save latest products to cache
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify(freshProducts)
      );
    } catch (err) {
      console.error("Failed to fetch store products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <StoreProductsContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
      }}
    >
      {children}
    </StoreProductsContext.Provider>
  );
}

export function useStoreProducts() {
  const ctx = useContext(StoreProductsContext);

  if (!ctx) {
    throw new Error(
      "useStoreProducts must be used inside StoreProductsProvider"
    );
  }

  return ctx;
}