import { Link } from "react-router-dom"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-green-700">
          MakhanaMart
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">

          <Link to="/" className="hover:text-green-600 transition">Home</Link>
          <Link to="/products" className="hover:text-green-600 transition">Products</Link>
          <Link
  to="/cart"
  className="relative hover:text-green-600 transition flex items-center gap-1"
>
  <span>🛒</span>
  <span>Cart</span>

  {/* Cart Count */}
  <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs rounded-full px-1.5">
    2
  </span>
</Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-3 flex flex-col gap-3  px-4 py-4 shadow-sm">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
          <Link to="/cart" onClick={() => setOpen(false)}>Cart</Link>
        </div>
      )}
    </nav>
  )
}
