import API_BASE_URL from "./api";
import { getToken } from "./authService";

function authHeaders() {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
}

/*
|--------------------------------------------------------------------------
| Dashboard Summary
|--------------------------------------------------------------------------
*/

export async function getSalesSummary() {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/sales/summary`,
    {
      headers: authHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load sales summary.");
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Sales History
|--------------------------------------------------------------------------
*/

export async function getSales() {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/sales`,
    {
      headers: authHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load sales.");
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Record Sale
|--------------------------------------------------------------------------
*/

export async function recordSale(payload) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/sales`,
    {
      method: "POST",
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to record sale.");
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Delete Sale
|--------------------------------------------------------------------------
*/

export async function deleteSale(id) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/sales/${id}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete sale.");
  }

  return data;
}