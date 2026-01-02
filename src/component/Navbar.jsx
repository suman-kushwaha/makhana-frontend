import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useCart } from "../context/CartContext"

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("home")
    const [open, setOpen] = useState(false)
    const { cartItems } = useCart()
    const [scrolled, setScrolled] = useState(false)

    // scroll background change
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // listen to section changes
    useEffect(() => {
        const handler = (e) => setActiveSection(e.detail)
        window.addEventListener("sectionChange", handler)
        return () => window.removeEventListener("sectionChange", handler)
    }, [])

    return (
        <nav
            className={`fixed top-0 w-full z-50 px-6 py-4 transition-all duration-300 
        ${scrolled
                    ? "bg-white border-b border-gray-200"
                    : "bg-white/70 backdrop-blur-sm "
                }`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className=" flex items-center gap-2 text-lg font-semibold text-green-700 tracking-wide"
                    ><img
                       src ="/logo1.jpeg"
                       
                       className="h-10 w-auto object-contain"
                    />
                   <span className="text-lg font-semibold text-green-700 ">
                    HSSM FOODs
                   </span>
                   </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-medium">
                    {/* Home */}
                    <Link
                        to="/"
                        className={`flex items-center h-10 transition ${activeSection === "home"
                            ? "text-green-700 font-semibold"
                            : "text-gray-700 hover:text-green-700"
                            }`}
                    >
                        Home
                    </Link>
                    {/* About */}
                    <span
                        onClick={() => {
                            window.dispatchEvent(new CustomEvent("scrollToSection", { detail: "about" }))
                            setOpen(false)
                        }}
                        className={`flex items-center h-10 cursor-pointer transition ${activeSection === "about"
                            ? "text-green-700 font-semibold"
                            : "text-gray-700 hover:text-green-700"
                            }`}
                    >
                        About
                    </span>

                    {/* Enquiry */}
                    <span
                        onClick={() => {
                            window.dispatchEvent(new CustomEvent("scrollToSection", { detail: "enquiry" }))
                            setOpen(false)
                        }}
                        className={`flex items-center h-10 cursor-pointer transition ${activeSection === "enquiry"
                            ? "text-green-700 font-semibold"
                            : "text-gray-700 hover:text-green-700"
                            }`}
                    >
                        Enquiry
                    </span>

                    {/* Products (same page section) */}
                    <span
                        onClick={() => {
                            window.dispatchEvent(
                                new CustomEvent("scrollToSection", { detail: "products" })
                            )
                            setOpen(false)
                        }}
                        className={`flex items-center h-10 cursor-pointer transition ${activeSection === "products"
                            ? "text-green-700 font-semibold"
                            : "text-gray-700 hover:text-green-700"
                            }`}
                    >
                        Products
                    </span>

                    {/* Cart */}
                    <Link
                        to="/cart"
                        className="relative flex items-center gap-1 h-10 text-gray-700 hover:text-green-700 transition "
                    >
                        <span>🛒</span>
                        <span>Cart ({cartItems.length})</span>

                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs rounded-full px-1.5">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/919871437317?text=Hi%2C%20I%20am%20interested%20in%20your%20makhana%20products."
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                    >
                        WhatsApp
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-2xl text-gray-700"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden mt-3 bg-white border-t flex flex-col gap-4 px-4 py-4 shadow-sm">

                    {/* Home */}
                    <Link
                        to="/"
                        onClick={() => setOpen(false)}
                        className={
                            activeSection === "home"
                                ? "text-green-700 font-semibold"
                                : "text-gray-700"
                        }
                    >
                        Home
                    </Link>

                    {/* Products */}
                    <span
                        onClick={() => {
                            window.dispatchEvent(
                                new CustomEvent("scrollToSection", { detail: "products" })
                            )
                            setOpen(false)
                        }}
                        className={
                            activeSection === "products"
                                ? "text-green-700 font-semibold cursor-pointer"
                                : "text-gray-700 cursor-pointer"
                        }
                    >
                        Products
                    </span>

                    {/* About */}
                    <span
                        onClick={() => {
                            window.dispatchEvent(
                                new CustomEvent("scrollToSection", { detail: "about" })
                            )
                            setOpen(false)
                        }}
                        className={
                            activeSection === "about"
                                ? "text-green-700 font-semibold cursor-pointer"
                                : "text-gray-700 cursor-pointer"
                        }
                    >
                        About
                    </span>

                    {/* Enquiry */}
                    <span
                        onClick={() => {
                            window.dispatchEvent(
                                new CustomEvent("scrollToSection", { detail: "enquiry" })
                            )
                            setOpen(false)
                        }}
                        className={
                            activeSection === "enquiry"
                                ? "text-green-700 font-semibold cursor-pointer"
                                : "text-gray-700 cursor-pointer"
                        }
                    >
                        Enquiry
                    </span>

                    {/* Cart */}
                    <Link
                        to="/cart"
                        onClick={() => setOpen(false)}
                        className="text-gray-700"
                    >
                        Cart ({cartItems.length})
                    </Link>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/919871437317?text=Hi%2C%20I%20am%20interested%20in%20your%20makhana%20products."
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green-600 text-white px-4 py-2 rounded-md text-center"
                        onClick={() => setOpen(false)}
                    >
                        WhatsApp
                    </a>
                </div>
            )}


        </nav>
    )
}