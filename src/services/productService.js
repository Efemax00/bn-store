import API_BASE_URL from "./api";
import { getToken } from "./authService";

function authHeaders() {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
}

/* -------------------------------------------------------------------------- */
/*                                Storefront                                  */
/* -------------------------------------------------------------------------- */

export async function getStoreProducts() {
  const response = await fetch(`${API_BASE_URL}/api/products`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load products.");
  }

  return data.data;
}

/* -------------------------------------------------------------------------- */
/*                              Admin Products                                */
/* -------------------------------------------------------------------------- */

export async function getProducts() {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/products`,
    {
      headers: authHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load products.");
  }

  // Supports both:
  // res.json(products)
  // and
  // res.json({ success: true, data: products })
  return data.data ?? data;
}

/* -------------------------------------------------------------------------- */
/*                              Create Product                                */
/* -------------------------------------------------------------------------- */

export async function createProduct(formData) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/products`,
    {
      method: "POST",
      headers: authHeaders(),
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create product.");
  }

  return data;
}

/* -------------------------------------------------------------------------- */
/*                              Update Product                                */
/* -------------------------------------------------------------------------- */

export async function updateProduct(id, formData) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/products/${id}`,
    {
      method: "PATCH",
      headers: authHeaders(),
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update product.");
  }

  return data;
}

/* -------------------------------------------------------------------------- */
/*                              Delete Product                                */
/* -------------------------------------------------------------------------- */

export async function deleteProduct(id) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/products/${id}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete product.");
  }

  return data;
}