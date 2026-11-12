
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useCart } from "../context/CartContext"

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("home")
    const [open, setOpen] = useState(false)
    const { cartItems } = useCart()
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const handler = (e) => setActiveSection(e.detail)
        window.addEventListener("sectionChange", handler)
        return () => window.removeEventListener("sectionChange", handler)
    }, [])

    const scrollTo = (section) => {
        window.dispatchEvent(
            new CustomEvent("scrollToSection", { detail: section })
        )
        setOpen(false)
    }

    const navClass = (section) =>
        `relative py-2 text-sm font-medium tracking-wide transition-all duration-300
        after:absolute after:bottom-0 after:left-0 after:h-[2px]
        after:bg-[#b99456] after:transition-all after:duration-300
        ${activeSection === section
            ? "text-[#263c50] after:w-full"
            : "text-gray-600 after:w-0 hover:text-[#263c50] hover:after:w-full"
        }`

    return (
        <nav
            className={`fixed top-[-12px] w-full z-50 px-3 sm:px-6 transition-all duration-500 ${
                scrolled
                    ? "py-2"
                    : "py-3 sm:py-4"
            }`}
        >
            <div
                className={`max-w-7xl mx-auto flex justify-between items-center
                rounded-2xl px-4 sm:px-6 transition-all duration-500
                ${
                    scrolled
                        ? "bg-white/95 backdrop-blur-xl shadow-[0_5px_25px_rgba(38,60,80,0.10)] border border-gray-100 py-2"
                        : "bg-white/75 backdrop-blur-lg border border-white/70 shadow-sm py-2.5"
                }`}
            >

                {/* PREMIUM BRAND AREA */}
                <Link
                    to="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 group min-w-0"
                >
                    <div className="relative flex items-center justify-center
                        h-11 w-11 sm:h-12 sm:w-12 rounded-xl
                        bg-[#f8f5ed] border border-[#e8dfcd]
                        shadow-sm group-hover:shadow-md transition-all duration-300">
                        <img
                            src="/logo.jpeg"
                            alt="Veenuts Logo"
                            className="h-9 w-9 sm:h-10 sm:w-10 object-contain
                            group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    <div className="flex flex-col min-w-0">
                        <span className="text-[11px] sm:text-sm font-bold
                            tracking-[0.12em] sm:tracking-[0.16em]
                            text-[#263c50] whitespace-nowrap">
                            HSSM FOODS
                        </span>

                        <span className="text-[8px] sm:text-[9px]
                            tracking-[0.18em] text-[#a88952] font-medium mt-1">
                            PRIVATE LIMITED
                        </span>

                        <span className="hidden sm:block text-[9px]
                            tracking-[0.12em] text-gray-500 mt-0.5">
                            QUALITY • TRUST • PURITY
                        </span>
                    </div>
                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden md:flex items-center gap-7 lg:gap-9">

                    <Link to="/" className={navClass("home")}>
                        Home
                    </Link>

                    <button
                        onClick={() => scrollTo("about")}
                        className={navClass("about")}
                    >
                        About
                    </button>

                    <button
                        onClick={() => scrollTo("products")}
                        className={navClass("products")}
                    >
                        Products
                    </button>

                    <button
                        onClick={() => scrollTo("enquiry")}
                        className={navClass("enquiry")}
                    >
                        Enquiry
                    </button>

                    {/* CART */}
                    <Link
                        to="/cart"
                        className="relative flex items-center gap-2 text-sm
                        font-medium text-gray-600 hover:text-[#263c50]
                        transition-colors"
                    >
                        <span className="text-lg">🛒</span>
                        Cart

                        {cartItems.length > 0 && (
                            <span className="absolute -top-3 -right-4
                                flex items-center justify-center
                                min-w-[19px] h-[19px] px-1
                                rounded-full bg-[#b99456] text-white
                                text-[10px] font-bold">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>

                    {/* WHATSAPP */}
                    <a
                        href="https://wa.me/919871437317?text=Hi%2C%20I%20am%20interested%20in%20your%20makhana%20products."
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-2
                        bg-gradient-to-r from-[#263c50] to-[#405b70]
                        text-white px-5 py-2.5 rounded-full text-sm
                        font-semibold border border-[#c49a53]/60
                        shadow-[0_4px_15px_rgba(38,60,80,0.15)]
                        hover:shadow-lg hover:-translate-y-0.5
                        transition-all duration-300"
                    >
                        <span>WhatsApp</span>
                        <span className="text-[#e5c58c] group-hover:translate-x-1 transition-transform">
                            →
                        </span>
                    </a>
                </div>

                {/* CUSTOM MOBILE MENU BUTTON */}
                <button
                    onClick={() => setOpen(!open)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    className="md:hidden relative flex flex-col items-center
                    justify-center gap-[5px] h-11 w-11 rounded-xl
                    bg-[#f8f5ed] border border-[#e8dfcd]
                    shadow-sm hover:shadow-md transition-all duration-300"
                >
                    <span className={`h-[2px] bg-[#263c50] rounded-full
                        transition-all duration-300 ${
                            open ? "w-5 translate-y-[7px] rotate-45" : "w-5"
                        }`} />

                    <span className={`h-[2px] bg-[#263c50] rounded-full
                        transition-all duration-300 ${
                            open ? "opacity-0 w-0" : "w-3.5"
                        }`} />

                    <span className={`h-[2px] bg-[#263c50] rounded-full
                        transition-all duration-300 ${
                            open ? "w-5 -translate-y-[7px] -rotate-45" : "w-5"
                        }`} />
                </button>

            </div>

            {/* MOBILE MENU */}
            <div
                className={`md:hidden max-w-7xl mx-auto overflow-hidden
                transition-all duration-300 ${
                    open
                        ? "max-h-[430px] opacity-100 mt-2"
                        : "max-h-0 opacity-0 mt-0"
                }`}
            >
                <div className="bg-white/95 backdrop-blur-xl
                    border border-gray-100 rounded-2xl p-5
                    shadow-[0_10px_30px_rgba(38,60,80,0.10)]
                    flex flex-col gap-1">

                    <Link
                        to="/"
                        onClick={() => setOpen(false)}
                        className="py-3 px-3 rounded-lg text-sm
                        font-medium text-[#263c50] hover:bg-[#f8f5ed]"
                    >
                        Home
                    </Link>

                    <button
                        onClick={() => scrollTo("products")}
                        className="text-left py-3 px-3 rounded-lg text-sm
                        font-medium text-gray-600 hover:bg-[#f8f5ed]"
                    >
                        Products
                    </button>

                    <button
                        onClick={() => scrollTo("about")}
                        className="text-left py-3 px-3 rounded-lg text-sm
                        font-medium text-gray-600 hover:bg-[#f8f5ed]"
                    >
                        About
                    </button>

                    <button
                        onClick={() => scrollTo("enquiry")}
                        className="text-left py-3 px-3 rounded-lg text-sm
                        font-medium text-gray-600 hover:bg-[#f8f5ed]"
                    >
                        Enquiry
                    </button>

                    <Link
                        to="/cart"
                        onClick={() => setOpen(false)}
                        className="py-3 px-3 rounded-lg text-sm
                        font-medium text-gray-600 hover:bg-[#f8f5ed]"
                    >
                        🛒 Cart ({cartItems.length})
                    </Link>

                    <a
                        href="https://wa.me/919871437317?text=Hi%2C%20I%20am%20interested%20in%20your%20makhana%20products."
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setOpen(false)}
                        className="mt-2 text-center py-3 rounded-xl
                        bg-gradient-to-r from-[#263c50] to-[#405b70]
                        text-white text-sm font-semibold
                        border border-[#c49a53]/60"
                    >
                        Contact Us on WhatsApp →
                    </a>
                </div>
            </div>
        </nav>
    )
}
