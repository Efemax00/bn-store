import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useProducts } from "../context/AdminProductsContext.jsx";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import {
  createProduct,
  updateProduct,
  deleteProduct as deleteProductApi,
} from "../services/productService";

const emptyForm = {
  number: "",
  name: "",
  manufacturer: "",
  type: "",
  description: "",
  notes: "",
  price: "",
  currency: "NGN",
  stock: "0",
  size: "50ml",
  status: "available",
  image: null,
};

export default function AdminDashboard() {
  const { logout } = useAuth();
  const {
  products,
  fetchProducts,
  nextNumber,
} = useProducts();
  const [form, setForm] = useState(emptyForm);
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("manufacturer", form.manufacturer); // Change to "brand" if backend still expects brand
      formData.append("type", form.type);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("currency", form.currency);
      formData.append(
        "status",
        Number(form.stock) > 0 ? "available" : "sold-out",
      );
      formData.append("stock", form.stock);
      formData.append("size", form.size);

      form.notes
        .split(",")
        .map((n) => n.trim())
        .filter(Boolean)
        .forEach((note) => {
          formData.append("notes[]", note);
        });

      if (form.image) {
        formData.append("image", form.image);
      }

      console.log("========== FORMDATA ==========");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      console.log("==============================");

      if (editingId) {
  await updateProduct(editingId, formData);
  alert("Product updated successfully!");
} else {
  await createProduct(formData);
  alert("Product added successfully!");
}

await fetchProducts();

setEditingId(null);
setForm(emptyForm);
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong.");
    }
  }

  function handleLogout() {
    logout();
    navigate("/admin/login", { replace: true });
  }

  function handleEdit(product) {
    setEditingId(product.id);

    setForm({
      name: product.name,
      manufacturer: product.manufacturer ?? "",
      type: product.type ?? "",
      description: product.description ?? "",
      notes: product.notes?.join(", ") ?? "",
      price: product.price,
      currency: product.currency,
      stock: String(product.stock),
      size: product.size ?? "50ml",
      status: product.status,
      image: null, // keep existing image unless a new one is selected
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleDelete(id) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) return;

  try {
    await deleteProductApi(id);

    await fetchProducts();

    alert("Product deleted successfully.");
  } catch (err) {
    console.error(err);
    alert(err.message || "Failed to delete product.");
  }
}

  return (
    <>
      <Nav />
      <div className="admin-shell dark">
        <div className="admin-wrap">
          <div className="admin-header">
            <div className="brand-block">
              <div className="brand-tag">Admin — manage products</div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <a
                className="admin-btn-ghost"
                href="/"
                target="_blank"
                rel="noreferrer"
              >
                View Storefront
              </a>

              <button
                className="admin-btn-ghost"
                onClick={() => navigate("/admin/sales")}
              >
                Sales Dashboard
              </button>

              <button className="admin-btn-ghost" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </div>

          <div className="admin-grid">
            <form className="admin-card" onSubmit={handleSubmit}>
              <h3 className="admin-card-title">
                <button type="submit" className="admin-btn-primary">
                  {editingId ? "Update Product" : "Add Product"}
                </button>
              </h3>

              <input
                id="number"
                name="number"
                className="admin-input"
                placeholder={nextNumber()}
                value={form.number}
                onChange={handleChange}
              />

              <label className="field-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                className="admin-input"
                placeholder="e.g. Velours Noir"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label className="field-label" htmlFor="brand">
                Brand
              </label>

              <input
                id="manufacturer"
                name="manufacturer"
                className="admin-input"
                placeholder="e.g. Dior"
                value={form.manufacturer}
                onChange={handleChange}
                required
              />

              <label className="field-label" htmlFor="type">
                Type / family
              </label>
              <input
                id="type"
                name="type"
                className="admin-input"
                placeholder="e.g. Woody Amber"
                value={form.type}
                onChange={handleChange}
              />

              <label className="field-label" htmlFor="notes">
                Notes <span className="field-hint">comma-separated</span>
              </label>
              <input
                id="notes"
                name="notes"
                className="admin-input"
                placeholder="e.g. Oud, Amber, Black pepper"
                value={form.notes}
                onChange={handleChange}
              />

              <div className="admin-input-row">
                <div style={{ flex: 1 }}>
                  <label className="field-label" htmlFor="price">
                    Price
                  </label>
                  <input
                    id="price"
                    name="price"
                    className="admin-input"
                    placeholder="e.g. ₦25,000"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                  <div style={{ flex: 1 }}>
                    <label className="field-label" htmlFor="stock">
                      Stock
                    </label>

                    <input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      className="admin-input"
                      value={form.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label className="field-label" htmlFor="size">
                    Size
                  </label>
                  <input
                    id="size"
                    name="size"
                    className="admin-input"
                    placeholder="50ml"
                    value={form.size}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <label className="field-label">Product Image</label>

              <label className="field-label">Description</label>

              <textarea
                name="description"
                className="admin-input"
                rows={4}
                value={form.description}
                onChange={handleChange}
              />

              <input
                type="file"
                accept="image/*"
                className="admin-input"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    image: e.target.files[0],
                  }))
                }
              />

              <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
                <button
                  type="submit"
                  className="admin-btn-primary"
                  style={{ flex: 1, marginTop: 0 }}
                >
                  {editingId ? "Update Product" : "Add Product"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="admin-btn-ghost"
                    style={{ flex: 1 }}
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="admin-card">
              <h3 className="admin-card-title">
                Current products{" "}
                <span className="field-hint">{products.length} total</span>
              </h3>
              <div className="admin-list">
                {products.map((p) => (
                  <div className="admin-list-row" key={p.id}>
                    <div>
                      <span className="scent-no">{p.number}</span>{" "}
                      <strong>{p.name}</strong>
                      <div className="field-hint">
                        {p.type} · ₦{Number(p.price).toLocaleString()}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        className="admin-btn-ghost"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>

                      <button
                        className="admin-btn-ghost admin-btn-danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {products.length === 0 && (
                  <p className="field-hint">
                    No products yet — add one on the left.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
