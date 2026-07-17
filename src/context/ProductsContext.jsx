import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getProducts } from "../services/productService";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

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