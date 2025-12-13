import { useCart } from "../context/CartContext"

export default function Cart() {
  const { cartItems, removeFromCart } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-gray-600">
          Add some products to see them here.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border p-4 rounded-md"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-green-700 font-bold">₹{item.price}</p>

            </div>
            <button
              onClick={() => removeFromCart(index)}
              className="text-red-500 hover:text-red-700 text-xl"
            >
              ❌
            </button>

          </div>
        ))}
      </div>
    </div>
  )
}

