import ProductCard from "../component/ProductCard"
import { useState, useRef, useEffect } from "react"
import { Leaf, Flame, Package, TestTube } from 'lucide-react'

const products = [
  {
    id: 1,
    name: "Mixed Raw Makhana",
    grade:"4-6 Suta",
    size: "Mixed (Wholesale Grade)",
    priceRange:"₹1000 - ₹1250 / kg",
    note :"Last lower price ₹950/kg",
    image: "/assets/m1.jpg",
  },
  {
    id: 2,
    name: "Raw Makhana",
    grade:"4 Suta",
    size: "Regular / Small",
    priceRange: "₹700 - ₹1000 / kg",
    note: "Most common, daily use",
    image: "/assets/m2.jpg",
  },
  {
    id: 3,
    name: "Raw Makhana",
    grade:"5 Suta",
    size: "Medium / Premium",
    priceRange: "₹1050 - ₹1300 / kg",
    note:"Popular for snacking",
    image: "/assets/m3.jpg",
  },
  {
    id: 4,
    name: "Large/Premium",
    grade:"6 Suta",
    size: "Large / Premium",
    priceRange: "₹1300 - ₹1500 / kg",
    note: "Ideal for gifting",
    image: "/assets/m4.jpg",
  },
  {
    id: 5,
    name: "Raw Makhana",
    grade:"7+ Suta",
    size: "Jumbo / Export Quality",
    priceRange: "₹1500 - ₹1700 / kg" ,
    note:"Expor & high-end market",
    image: "/assets/m4.jpg",
  },
]

export default function Home() {
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


  const handleShopNowClick = () => {
    if (productsRef.current) {
      const yOffset = -100 // navbar height offset
      const y =
        productsRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset

      window.scrollTo({ top: y, behavior: "smooth" })
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

  const whatsappURL = `https://wa.me/917318892828+
  +?ext=${encodeURIComponent(
    message
  )}`

  window.open(whatsappURL, "_blank")
}

  const handleChange = (e) => {
    const { name, value } = e.target
    setEnquiry((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh]  flex items-center bg-cover bg-center "
        style={{ backgroundImage: "url('/makhana bowl.webp')" }}
      >


        {/* Overlay */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 text-center ">
          <h1 className="text-4xl md:text-5xl font-bold">
            Premium Makhana for Healthy Living
          </h1>

          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
            Fresh, crunchy and nutritious makhana sourced directly from farmers.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handleShopNowClick}
              className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition">
              Shop Now
            </button>
            <button 
            onClick={()=>
              window.dispatchEvent(
                new CustomEvent("scrollToSection",{detail:"enquiry"})
              )
            }
            className="bg-green-700 text-white border border-green-700 px-6 py-3 rounded-md hover:bg-green-800 transition">
              Become a Distributor
            </button>
          </div>
        </div>
      </section>

      {/* our story */}
      <section ref={storyRef} className="py-16 bg-gradient-to-b from-gray-100 to-white ">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          {/* Image / Placeholder */}
          <div
            className="h-72 rounded-xl overflow-hidden
             bg-cover bg-center bg-no-repeat
             border border-gray-400
             shadow-xl shadow-black/30"
            style={{ backgroundImage: "url('/makhana process.jpg')" }}
          >
          </div>
          {/* Content */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Story
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              HSSM FOODS PRIVATE LIMITED sources handpicked makhana from trusted
              farmers in Bihar and processes them in hygienic facilities to deliver
              crunchy, nutritious snacks to customers across India and abroad.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="bg-orange-100 text-green-700 p-2 rounded-md">✔</span>
                <div>
                  <Leaf className="text-green-600 mb-2" />
                  <p className="font-medium">100% Natural</p>
                  <p className="text-sm text-gray-500">No preservatives</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-green-100 text-green-700 p-2 rounded-md">🏭</span>
                <div>
                  <Package  className="text-orange-600 mb-2" />
                  <p className="font-medium">Hygienic Processing</p>
                  <p className="text-sm text-gray-500">Modern facilities</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-green-100 text-green-700 p-2 rounded-md">🌱</span>
                <div>
                  
                  <p className="font-medium">Sustainably Sourced</p>
                  <p className="text-sm text-gray-500">Support local farmers</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-orange-100 text-green-700 p-2 rounded-md">🧪</span>
                <div>
                  
                  <p className="font-medium">Lab Tested</p>
                  <p className="text-sm text-gray-500">Quality assured</p>
                </div>
              </div>
            </div>
          </div>



        </div>
      </section>


      {/* Featured Products */}
      <section ref={productsRef} className="py-16 ">

        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Featured Products By Size
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
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

      {/* Distributors & Bulk Buyers */}
      <section ref={enquiryRef} className="py-16 bg-gradient-to-br from-orange-50  to-orange-50">

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Left Content */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Distributors & Bulk Buyers
            </h2>

            <p className="text-gray-600 mb-4">
              We supply bulk quantities with private-labeling options.
              Fill the form and our sales team will get back to you within 24 hours.
            </p>

            <ul className="text-gray-700 space-y-2">
              <li>• Minimum order: 10kg</li>
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

    </div>
  )
}
