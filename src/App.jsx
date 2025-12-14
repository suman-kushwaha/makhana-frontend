import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Layout from "./component/Layout"

function App() {
  return (
    <div className="pt-18">
    <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    </Layout>
    </div>
  )
}

export default App
