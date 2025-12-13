import { Link } from "react-router-dom"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-green-700">
          MakhanaMart
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <Link to="/products" className="hover:text-green-600">Products</Link>
          <Link to="/cart" className="hover:text-green-600">Cart</Link>
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
        <div className="md:hidden mt-3 flex flex-col gap-3 px-2">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
          <Link to="/cart" onClick={() => setOpen(false)}>Cart</Link>
        </div>
      )}
    </nav>
  )
}
