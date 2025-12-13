import ProductCard from "../component/ProductCard"
import { useState } from "react"

const products = [
  {
    id: 1,
    name: "Roasted Peri-Peri Makhana",
    price: 120,
    weight: "70g",
    image: "/assets/m1.jpg",
  },
  {
    id: 2,
    name: "Himalayan Pink Salt",
    price: 130,
    weight: "70g",
    image: "/assets/m2.jpg",
  },
  {
    id: 3,
    name: "Cream & Onion",
    price: 125,
    weight: "70g",
    image: "/assets/m3.jpg",
  },
  {
    id: 4,
    name: "Raw White Makhana (Bulk)",
    price: 750,
    weight: "1kg",
    image: "/assets/m4.jpg",
  },
]

export default function Home() {
  const [enquiry, setEnquiry] = useState({
    name: "",
    company: "",
    city: "",
    volume: "",
    mobile: "",
    email: "",
  })
  const handleEnquirySubmit = () => {
    const message = `
Bulk Enquiry:
Name: ${enquiry.name}
Company: ${enquiry.company}
City: ${enquiry.city}
Order Volume: ${enquiry.volume} kg
Mobile: ${enquiry.mobile}
Email: ${enquiry.email}
  `

    const whatsappURL = `https://wa.me/919871437317?text=${encodeURIComponent(
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
      <section className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800">
            Premium Makhana for Healthy Living
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Fresh, crunchy and nutritious makhana sourced directly from farmers.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <button className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition">
              Shop Now
            </button>
            <button className="border border-green-700 text-green-700 px-6 py-3 rounded-md hover:bg-green-50 transition">
              Become a Distributor
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Health Benefits */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Health Benefits
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "High in Protein",
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
                title: "Low Glycemic Index",
                desc: "Helps manage blood sugar levels.",
              },
              {
                title: "Vegan Friendly",
                desc: "Plant-based and suitable for vegan diets.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg p-6 hover:shadow-md transition"
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

      {/* Distributors & Bulk Buyers */}
      <section className="py-16 bg-white">
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
          <div className="border rounded-lg p-6 shadow-sm">
            <form className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={enquiry.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
              />

              <input
                type="text"
                 name="company"
                placeholder="Company"
                value={enquiry.company}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={enquiry.city}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />

              <input
                type="number"
                name="volume"
                placeholder="Order Volume (kg)"
                value={enquiry.volume}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile"
                value={enquiry.mobile}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={enquiry.email}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />

              <button
                type="button"
                onClick={handleEnquirySubmit}
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
