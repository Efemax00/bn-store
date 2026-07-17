import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext.jsx";
import { getProducts } from "../services/productService";
import { recordSale, getSales } from "../services/salesService";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";


function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameWeek(date, now) {
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay()); // start of week (Sunday)
  start.setHours(0, 0, 0, 0);
  return date >= start;
}

function formatNaira(n) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n || 0);
}

export default function SalesDashboard() {
  const { products, fetchProducts } = useProducts(); 
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadSales();
  }, []);

  async function loadSales() {
    try {
      setLoading(true);
      const data = await getSales();
      setSales(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function refreshProducts() {
  try {
    const data = await getProducts();
    setProducts(data.products);
  } catch (err) {
    console.error(err);
  }
}

  const stats = useMemo(() => {
    const now = new Date();
    let today = 0, thisWeek = 0, total = 0, revenue = 0;

    sales.forEach((s) => {
      const date = new Date(s.date || s.createdAt);
      const lineTotal = s.total ?? s.quantity * s.unitPrice;
      total += s.quantity;
      revenue += lineTotal;
      if (isSameDay(date, now)) today += s.quantity;
      if (isSameWeek(date, now)) thisWeek += s.quantity;
    });

    return { today, thisWeek, total, revenue };
  }, [sales]);

  async function handleRecordSale(e) {
    e.preventDefault();
    const product = products.find((p) => p.id === selectedProductId);
    if (!product || quantity < 1) return;

    const qty = Number(quantity);
    const unitPrice = Number(product.price);
    const currentStock = Number(product.stock ?? 0);

    if (qty > currentStock) {
      alert(`Only ${currentStock} left in stock.`);
      return;
    }

    setSubmitting(true);
    try {
      // 1. record the sale
      await recordSale({
        productId: product.id,
        productName: product.name,
        quantity: qty,
        unitPrice,
        total: qty * unitPrice,
      });

      // 2. decrease stock — adjust field name/payload shape to match
      //    whatever updateProduct expects on your backend (FormData vs JSON)
      const newStock = currentStock - qty;
      const formData = new FormData();

formData.append("name", product.name);
formData.append("manufacturer", product.manufacturer);
formData.append("price", product.price);
formData.append("currency", product.currency);
formData.append("stock", newStock);
formData.append("size", product.size);
formData.append("type", product.type || "");
formData.append("description", product.description || "");

(product.notes || []).forEach(note => {
    formData.append("notes[]", note);
});

await updateProduct(product.id, formData);
      // 3. refresh local state
      if (refreshProducts) await fetchProducts();
      await loadSales();

      setSelectedProductId("");
      setQuantity(1);
      alert("Sale recorded.");
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Nav />
      <div className="admin-shell dark">
        <div className="admin-wrap">
          <div className="admin-header">
            <div className="brand-block">
              <div className="brand-tag">Sales dashboard</div>
            </div>

<div style={{ display: "flex", gap: 12 }}>
  <button
    className="admin-btn-ghost"
    onClick={() => navigate("/admin")}
  >
    📦 Products
  </button>

  <button
    className="admin-btn-ghost"
    onClick={() => navigate("/admin/sales")}
  >
    💰 Sales
  </button>

  <button
    className="admin-btn-ghost"
    onClick={() => navigate("/")}
  >
    🛍 Storefront
  </button>
</div>

</div>

          {/* stat tiles */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div className="admin-card">
              <h3 className="admin-card-title">Today</h3>
              <p style={{ fontSize: 28, color: "var(--fg)" }}>{stats.today}</p>
              <p className="field-hint">units sold</p>
            </div>
            <div className="admin-card">
              <h3 className="admin-card-title">This week</h3>
              <p style={{ fontSize: 28, color: "var(--fg)" }}>{stats.thisWeek}</p>
              <p className="field-hint">units sold</p>
            </div>
            <div className="admin-card">
              <h3 className="admin-card-title">Total sales</h3>
              <p style={{ fontSize: 28, color: "var(--fg)" }}>{stats.total}</p>
              <p className="field-hint">units, all-time</p>
            </div>
            <div className="admin-card">
              <h3 className="admin-card-title">Revenue</h3>
              <p style={{ fontSize: 24, color: "var(--gold)" }}>
                {formatNaira(stats.revenue)}
              </p>
              <p className="field-hint">all-time</p>
            </div>
          </div>

          <div className="admin-grid">
            {/* record sale form */}
            <form className="admin-card" onSubmit={handleRecordSale}>
              <h3 className="admin-card-title">Record a sale</h3>

              <label className="field-label" htmlFor="product">
                Product
              </label>
              <select
                id="product"
                className="admin-input"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                required
              >
                <option value="">Select a product…</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.stock ?? 0} in stock
                  </option>
                ))}
              </select>

              <label className="field-label" htmlFor="quantity">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                className="admin-input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />

              <button
                type="submit"
                className="admin-btn-primary"
                disabled={submitting || !selectedProductId}
              >
                {submitting ? "Recording…" : "Record Sale"}
              </button>
            </form>

            {/* recent sales list */}
            <div className="admin-card">
              <h3 className="admin-card-title">
                Recent sales <span className="field-hint">{sales.length} total</span>
              </h3>
              <div className="admin-list">
                {loading && <p className="field-hint">Loading…</p>}
                {!loading && sales.length === 0 && (
                  <p className="field-hint">No sales recorded yet.</p>
                )}
                {[...sales]
                  .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
                  .slice(0, 12)
                  .map((s) => (
                    <div className="admin-list-row" key={s.id || s._id}>
                      <div>
                        <strong>{s.productName}</strong>
                        <div className="field-hint">
                          Qty {s.quantity} · {formatNaira(s.total ?? s.quantity * s.unitPrice)}
                        </div>
                      </div>
                      <span className="field-hint">
                        {new Date(s.date || s.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}