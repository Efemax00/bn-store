import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { getStoreProducts } from "../services/productService";

const StoreProductsContext = createContext(null);

export function StoreProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    try {
      const products = await getStoreProducts();
      setProducts(products);
    } catch (err) {
      console.error(err);
      setProducts([]);
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