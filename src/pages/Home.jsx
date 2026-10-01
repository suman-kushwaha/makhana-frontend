import ProductCard from "../component/ProductCard"
import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Leaf, Flame, Package, TestTube } from 'lucide-react'
import { MessageCircle } from "lucide-react"

const products = [
  {
    id: 1,
    type: "wholesale",
    name: " Raw Makhana",
    grade: "4-6 Suta",
    size: "Mixed (Wholesale Grade)",
    priceRange: "₹1020 / kg",
    note: "Last lower price ₹950/kg",
    image: "/makhana-bowl.png",
  },
  {
    id: 2,
    type: "wholesale",
    name: "Raw Makhana",
    grade: "4 Suta",
    size: "Regular / Small",
    priceRange: "₹720 / kg",
    note: "Most common, daily use",
    image: "/makhana-bowl.png",
  },
  {
    id: 3,
    type: "wholesale",
    name: "Raw Makhana",
    grade: "5 Suta",
    size: "Medium / Premium",
    priceRange: "₹1060 / kg",
    note: "Popular for snacking",
    image: "/makhana-bowl.png",
  },
  {
    id: 4,
    type: "wholesale",
    name: "Large/Premium",
    grade: "6 Suta",
    size: "Large / Premium",
    priceRange: "₹1190 / kg",
    note: "Ideal for gifting",
    image: "/makhana-bowl.png",
  },
  {
    id: 5,
    type: "wholesale",
    name: "Raw Makhana",
    grade: "7+ Suta",
    size: "Jumbo / Export Quality",
    priceRange: "₹1500 - ₹1700 / kg",
    note: "Expor & high-end market",
    image: "/makhana-bowl.png",
  },
  {
    id: 6,
    type: "retail",
    name: "6 Suta Makhana",
    flavor: "Premium",
    weight: "250g",
    price: 370,
    originalPrice: 599,
    bestseller: true,
    image: "/packaging.png",
  },
  {
    id: 7,
    type: "retail",
    name: "5 Suta Makhana",
    flavor: "Premium",
    weight: "250g",
    price: 320,
    originalPrice: 529,
    bestseller: true,
    image: "/packaging.png",
  },
  {
    id: 8,
    type: "retail",
    name: "4 Suta Makhana",
    flavor: "Premium",
    weight: "250g",
    price: 220,
    originalPrice: 499,
    bestseller: true,
    image: "/packaging.png",
  },
  {
    id: 9,
    type: "retail",
    name: "Mix Makhana",
    flavor: "Mixed",
    weight: "250g",
    price: 280,
    originalPrice: 350,
    bestseller: false,
    image: "/packaging.png"
  }
]
export default function Home() {
  const [searchParams] = useSearchParams()

  const [category, setCategory] = useState(() => {
    const requestedCategory = searchParams.get("category")

    return ["all", "retail", "wholesale"].includes(requestedCategory)
      ? requestedCategory
      : "all"
  })

  useEffect(() => {
    const requestedCategory = searchParams.get("category")

    if (["all", "retail", "wholesale"].includes(requestedCategory)) {
      setCategory(requestedCategory)
    }
  }, [searchParams])

  const heroRef = useRef(null)
  const productsRef = useRef(null)
  const enquiryRef = useRef(null)
  const storyRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120

      if (
        enquiryRef.current &&
        scrollPos >= enquiryRef.current.offsetTop
      ) {
        window.dispatchEvent(new CustomEvent("sectionChange", { detail: "enquiry" }))
      } else if (storyRef.current && scrollPos >= storyRef.current.offsetTop) {
        window.dispatchEvent(new CustomEvent("sectionChange", { detail: "about" }))
      } else if (
        productsRef.current &&
        scrollPos >= productsRef.current.offsetTop
      ) {
        window.dispatchEvent(new CustomEvent("sectionChange", { detail: "products" }))
      } else {
        window.dispatchEvent(new CustomEvent("sectionChange", { detail: "home" }))
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleScrollToSection = (e) => {
      const offset = -100
      let ref = null

      if (e.detail === "about") ref = storyRef
      if (e.detail === "enquiry") ref = enquiryRef
      if (e.detail === "products") ref = productsRef

      if (ref?.current) {
        const y =
          ref.current.getBoundingClientRect().top +
          window.pageYOffset +
          offset

        window.scrollTo({ top: y, behavior: "smooth" })
      }
    }

    window.addEventListener("scrollToSection", handleScrollToSection)
    return () =>
      window.removeEventListener("scrollToSection", handleScrollToSection)
  }, [])


  const handleCategoryClick = (selectedCategory) => {
    // Apply the selected product filter
    setCategory(selectedCategory)

    // Scroll to the Products section
    if (productsRef.current) {
      const yOffset = -100

      const y =
        productsRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset

      window.scrollTo({
        top: y,
        behavior: "smooth",
      })
    }
  }


  const [enquiry, setEnquiry] = useState({
    name: "",
    company: "",
    city: "",
    volume: "",
    mobile: "",
    email: "",
  })

  const handleEnquirySubmit = (e) => {
    e.preventDefault()

    const { name, company, city, volume, mobile, email } = enquiry

    if (!name || !company || !city || !volume || !mobile || !email) {
      alert("Please fill all fields before submitting.")
      return
    }

    const message = `
Bulk Enquiry:
Name: ${name}
Company: ${company}
City: ${city}
Order Volume: ${volume}
Mobile: ${mobile}
Email: ${email}
  `

    const whatsappURL = `https://wa.me/919871437317?text=${encodeURIComponent(message)}`

    window.open(whatsappURL, "_blank")
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEnquiry((prev) => ({
      ...prev,
      [name]: value,
    }))
  }


  const filteredProducts =
    category === "all"
      ? products
      : products.filter(p => p.type === category)


  return (
    <div>

      {/* Hero Section */}
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[88vh] overflow-hidden bg-gray-900"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/makhana-bowl1.webp')" }}
        />

        {/* Dark + soft overlay for text readability */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[88vh] flex items-center">

          <div className="max-w-2xl py-20">

            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
              <Leaf className="w-4 h-4 text-green-300" />
              Premium Indian Superfood
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white">
              Premium Makhana.
              <span className="block text-green-300">
                Made for Better Snacking.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg md:text-xl leading-8 text-white/80 max-w-xl">
              Carefully selected makhana sourced from trusted farmers,
              processed with care and brought to you for healthier,
              crunchier snacking.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              <button
                onClick={() => handleCategoryClick("retail")}

                className="group inline-flex items-center gap-2 bg-green-600 text-white px-7 py-3.5 rounded-full font-medium shadow-lg hover:bg-green-700 hover:-translate-y-1 transition-all duration-300"
              >
                Shop Retail Products
                <span className="group-hover:translate-x-1 transition">
                  →
                </span>
              </button>

              <button
                onClick={() => handleCategoryClick("wholesale")}

                className="group inline-flex items-center gap-2 bg-orange-600  border border-white/30 text-white px-7 py-3.5 rounded-full font-medium hover:bg-white hover:text-gray-900 hover:-translate-y-1 transition-all duration-300"
              >
                Shop Wholesale Products 
                <span className="group-hover:translate-x-1 transition">
                  →
                </span>
              </button>

            </div>

            {/* Trust Points */}
            <div className="mt-10 pt-6 border-t border-white/20 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/75">

              <div className="flex items-center gap-2">
                <span className="text-green-300">✓</span>
                Premium Quality
              </div>

              <div className="flex items-center gap-2">
                <span className="text-green-300">✓</span>
                Direct from Farmers
              </div>

              <div className="flex items-center gap-2">
                <span className="text-green-300">✓</span>
                Retail & Wholesale
              </div>

            </div>

          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent" />

      </section>


      {/* Our Story */}
      <section
        ref={storyRef}
        className="py-16 bg-gradient-to-b from-gray-100 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

          {/* Left - Image */}
          <div
            className="h-[380px] sm:h-[420px] lg:h-[440px]
                 rounded-xl overflow-hidden
                 bg-cover bg-center bg-no-repeat
                 border border-gray-300
                 shadow-xl shadow-black/20"
            style={{ backgroundImage: "url('/makhana process.jpg')" }}
          >
          </div>

          {/* Right - Content */}
          <div>

            {/* Story Heading Card */}
            <div
              className="inline-flex items-center gap-3 mb-5
                   px-5 py-3 rounded-2xl
                   bg-white border border-green-100
                   shadow-md shadow-green-900/10
                   hover:-translate-y-1 hover:shadow-lg
                   transition-all duration-300"
            >
              <span
                className="w-10 h-10 rounded-xl bg-green-100
                     flex items-center justify-center"
              >
                <Leaf className="w-5 h-5 text-green-700" />
              </span>

              <div>
                <p className="text-xs uppercase tracking-[0.25em]
                        font-semibold text-green-600">
                  Discover
                </p>

                <h2 className="text-2xl md:text-3xl font-bold
                         tracking-tight text-gray-800 leading-none">
                  Our Story
                </h2>
              </div>
            </div>

            {/* Story Text */}
            <p className="text-base md:text-lg text-gray-600
                    leading-8 mb-6 font-normal">
              HSSM FOODS PRIVATE LIMITED sources handpicked makhana from trusted
              farmers in Bihar and processes them in hygienic facilities to deliver
              crunchy, nutritious snacks to customers across India and abroad.
              Veenuts is a health-focused snacking brand under HSSM Enterprises,
              dedicated to offering premium quality makhana (foxnuts).
            </p>

            <p className="text-base md:text-lg text-gray-600
                    leading-8 mb-7">
              We are committed to creating value for farmers, consumers and
              retailers by transforming traditional Indian superfoods into
              modern, guilt-free snacks.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-5">

              <div className="flex items-start gap-3">
                <span className="bg-orange-100 text-green-700 p-2 rounded-lg">
                  ✔
                </span>

                <div>
                  <Leaf className="text-green-600 mb-2 w-5 h-5" />
                  <p className="font-semibold text-gray-900">
                    100% Natural
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    No preservatives
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-green-100 text-green-700 p-2 rounded-lg">
                  🏭
                </span>

                <div>
                  <Package className="text-orange-600 mb-2 w-5 h-5" />
                  <p className="font-semibold text-gray-900">
                    Hygienic Processing
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Modern facilities
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-green-100 text-green-700 p-2 rounded-lg">
                  🌱
                </span>

                <div>
                  <p className="font-semibold text-gray-900">
                    Sustainably Sourced
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Support local farmers
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-orange-100 text-green-700 p-2 rounded-lg">
                  🧪
                </span>

                <div>
                  <p className="font-semibold text-gray-900">
                    Lab Tested
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Quality assured
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>





      {/* Divider here */}
      <div className="overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.29,22,98.57,29.05,146,17C230.67,47,284,6,339,1.3c54.92-4.7,104,23.6,158,37.7,54,14.1,113,14.1,167,0s103-42.4,158-46.1c54.92-3.7,104,14.8,158,28.9,54,14.1,113,14.1,167,0s103-42.4,158-46.1V0Z"
            fill="#d1fae5"
            className="animate-pulse"
          ></path>
        </svg>
      </div>

      <section className="px-6 md:px-16 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT IMAGE */}
          <div>
            <img
              src="/processing.jpg" // change if needed
              alt="Makhana Benefits"
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <div className="mb-4">
              <h2 className="text-3xl md:text-4xl font-semibold text-green-700 tracking-tight">
                Our Mission
              </h2>
              <div className="w-10 h-[2px] bg-green-600 mt-2"></div>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">
              <span className="font-semibold">
                Driven by our motto — "Live The Green Life"
              </span>{" "}
              — we envision Veenuts as a household name for wellness snacking in India and beyond.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our mission is to make makhana the preferred healthy snack by delivering premium-quality products that combine taste, nutrition, and trust.
            </p>

            {/* LIST */}
            <ul className="space-y-3 text-gray-700">
              <li>🌱 <span className="font-semibold">Promoting Healthy Living</span> – Natural, roasted, guilt-free snacks.</li>
              <li>🤝 <span className="font-semibold">Empowering Farmers</span> – Supporting local farmers & fair sourcing.</li>
              <li>🏭 <span className="font-semibold">Ensuring Quality</span> – Hygienic processing & premium packaging.</li>
              <li>🌍 <span className="font-semibold">Expanding Globally</span> – Taking India’s superfood worldwide.</li>
              <li>💡 <span className="font-semibold">Innovation</span> – New flavors & modern packaging.</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.29,22,98.57,29.05,146,17C230.67,47,284,6,339,1.3c54.92-4.7,104,23.6,158,37.7,54,14.1,113,14.1,167,0s103-42.4,158-46.1c54.92-3.7,104,14.8,158,28.9,54,14.1,113,14.1,167,0s103-42.4,158-46.1V0Z"
            fill="#d1fae5"
            className="animate-pulse"
          ></path>
        </svg>
      </div>
      <section className="px-6 md:px-16 py-16 bg-white">
        <div className="max-w-5xl mx-auto text-center">

          {/* HEADING */}
          <h2 className="text-3xl md:text-4xl font-semibold text-green-700 tracking-tight mb-4">
            What We Do
          </h2>

          <p className="text-gray-600 mb-10">
            At HSSM FOODS PRIVATE LIMITED, we deliver premium makhana products from farm to table, focusing on quality, hygiene, and taste.
          </p>

          {/* BOXES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {[
              "Sourcing & Farming – Direct farmer partnerships",
              "Processing & Grading – Hygienic cleaning & roasting",
              "Wholesale Distribution – Bulk supply across India",
              "Private Labeling & B2B – Custom branding solutions",
              "Export – Expanding globally with premium makhana",
            ].map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-xl border border-gray-200 bg-gray-50 
          hover:bg-white hover:shadow-lg hover:-translate-y-1 
          transition-all duration-300 cursor-pointer"
              >
                <p className="text-gray-900">{item}</p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Featured Products */}
      <div
        ref={productsRef}
        className="pt-16"
      ></div>
      <div className="flex gap-4 mb-6 justify-center">
        <button
          onClick={() => setCategory("all")}
          className="px-4 py-2 bg-orange-500 text-white rounded-md 
    hover:-translate-y-1 hover:shadow-md 
    transition-all duration-300"
        >
          All
        </button>

        <button
          onClick={() => setCategory("wholesale")}
          className="px-4 py-2 bg-green-600 text-white rounded-md 
    hover:-translate-y-1 hover:shadow-md 
    transition-all duration-300"
        >
          Wholesale
        </button>

        <button
          onClick={() => setCategory("retail")}
          className="px-4 py-2 bg-orange-500 text-white rounded-md 
    hover:-translate-y-1 hover:shadow-md 
    transition-all duration-300"
        >
          Retail Packets
        </button>
      </div>

      <section className="py-16 ">

        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Featured Products By Size
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
        
      {/* Health Benefits */}
      <section className="py-16 bg-gradient-to-b from-white via-gray-50 to-white">

        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Health Benefits
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "High in Protein ⚡",
                desc: "Supports muscle growth and keeps you full longer.",
              },
              {
                title: "Low in Calories",
                desc: "A guilt-free snack for everyday cravings.",
              },
              {
                title: "Gluten Free",
                desc: "Safe for gluten-sensitive diets.",
              },
              {
                title: "Low Glycemic Index ⚖️",
                desc: "Helps manage blood sugar levels.",
              },
              {
                title: "Vegan Friendly 🌿",
                desc: "Plant-based and suitable for vegan diets.",
              },
              {
                title: "Brain booster 🧠",
                desc: "High in antioxidants, improve memory",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition shadow-lg shadow-black/10"
              >
                <h3 className="font-bold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*why to choose us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">

          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold font-serif text-orange-500 tracking-tight">
              Why Choose Us
            </h2>

            <div className="mt-3 flex justify-center">
              <span className="w-12 h-[2px] bg-green-600 rounded-full"></span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[
              {
                title: "Premium Quality",
                desc: "Carefully selected makhana ensuring top quality."
              },
              {
                title: "Direct From Farmers",
                desc: "Sourced directly from trusted farmers in Bihar."
              },
              {
                title: "Pan India Supply",
                desc: "Reliable delivery across India and export ready."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white border border-gray-200 
      shadow-lg shadow-black/10 
      hover:-translate-y-2 hover:shadow-xl 
      transition-all duration-300 cursor-pointer"
              >
                <h3 className="font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>
      {/* Testimonial */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center ">

          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-orange-500 tracking-tight">
              What Our Clients Says
            </h2>

            <div className="mt-3 flex justify-center">
              <span className="w-12 h-[2px] bg-green-600 rounded-full"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {[
              {
                text: "Great quality makhana and very reliable supply.",
                name: "Retailer, Delhi"
              },
              {
                text: "Packaging and pricing are excellent.",
                name: "Distributor, Mumbai"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white border border-gray-200 
      shadow-lg shadow-black/10 
      hover:-translate-y-2 hover:shadow-xl 
      transition-all duration-300 cursor-pointer"
              >
                <p className="text-gray-600 italic">
                  "{item.text}"
                </p>
                <p className="mt-3 font-medium text-gray-800">
                  — {item.name}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Distributors & Bulk Buyers */}
      <section ref={enquiryRef} className="py-16 bg-gradient-to-br from-orange-50  to-orange-50">

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Left Content */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Distributors & Bulk Buyers
            </h2>

            <p className="text-gray-600 mb-4">
              We would love to hear from you whether you are a wholesaller, retailer, distributor
              or coustomer, we are here to assist you with all your makhana product needs.
              We supply bulk quantities with private-labeling options.
              Fill the form and our sales team will get back to you within 24 hours.
            </p>

            <ul className="text-gray-700 space-y-2">
              <li>• Minimum order: 100kg</li>
              <li>• Custom packaging available</li>
              <li>• Export-ready consignments</li>
            </ul>
          </div>

          {/* Enquiry Form */}
          <div className="border border-gray-300 rounded-xl p-6 bg-white 
           hover:shadow-md transition shadow-lg shadow-black/20">
            <form onSubmit={handleEnquirySubmit} className="space-y-4 ">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={enquiry.name}
                onChange={handleChange}
                className="w-full border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring-1
                 focus:ring-green-600 "
              />

              <input
                type="text"
                name="company"
                required
                placeholder="Company"
                value={enquiry.company}
                onChange={handleChange}
                className="w-full border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring-green-600 focus:ring-1"
              />

              <input
                type="text"
                name="city"
                required
                placeholder="City"
                value={enquiry.city}
                onChange={handleChange}
                className="w-full border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring-green-600 focus:ring-1"
              />

              <input
                type="number"
                name="volume"
                required
                placeholder="Order Volume (kg)"
                value={enquiry.volume}
                onChange={handleChange}
                className="w-full border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring-green-600 focus:ring-1"
              />

              <input
                type="tel"
                name="mobile"
                required
                placeholder="Mobile"
                value={enquiry.mobile}
                onChange={handleChange}
                className="w-full border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring-green-600 focus:ring-1"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                value={enquiry.email}
                onChange={handleChange}
                className="w-full border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring-green-600 focus:ring-1"
              />

              <button
                type="submit"

                className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/919871437317?text=Hi%2C%20I%20am%20interested%20in%20your%20makhana%20products."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5  p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-50"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-8 h-8"
        />
      </a>
    </div>
  )
}

