import ProductCard from "../component/ProductCard"

const products = [
  { id: 1, name: "Classic Makhana", price: 5.99, image: "/assets/m1.jpg" },
  { id: 2, name: "Spicy Makhana", price: 6.99, image: "/assets/m2.jpg" },
  { id: 3, name: "Cheese Makhana", price: 7.99, image: "/assets/m3.jpg" },
  { id: 4, name: "Caramel Makhana", price: 8.99, image: "/assets/m4.jpg" },
]

export default function Home() {
  return (
    <div>
      <section className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800">
            Premium Makhana for Healthy Living
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Fresh, crunchy and nutritious makhana sourced directly from farmers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <button className="mt-6 bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition">
            Shop Now
          </button>
        </div>
      </section>
    </div>
  )
}
