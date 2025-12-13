export default function Home() {
  return (
    <section className="bg-green-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-green-800">
          Premium Makhana, Delivered Fresh
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Healthy, crunchy, and delicious makhana sourced directly from trusted farmers.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Shop Now
          </button>

          <button className="border border-green-600 text-green-700 px-6 py-3 rounded-lg hover:bg-green-100">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}
