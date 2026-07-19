import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import { Link } from "react-router-dom";

export default function CollectionPage() {
  return (
    <>
      <Nav />
      <div style={{ padding: "24px 6vw 0" }}>
        <Link
          to="/"
          className="admin-btn-ghost"
          style={{ display: "inline-block" }}
        >
          ← Back to home
        </Link>
      </div>
      <ProductGrid heading="The full collection" />
      <Footer />
    </>
  );
}
