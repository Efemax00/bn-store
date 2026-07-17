import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import ProductGrid from '../components/ProductGrid.jsx'

export default function CollectionPage() {
  return (
    <>
      <Nav />
      <ProductGrid heading="The full collection" />
      <Footer />
    </>
  )
}