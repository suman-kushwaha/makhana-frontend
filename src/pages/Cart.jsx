import { useCart } from "../context/CartContext"

export default function Cart() {
  const { cartItems, removeFromCart } = useCart()

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price),
    0
  )

  const handleCheckout = () => {
  const itemsText = cartItems
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} (${item.weight}) - ₹${item.price}`
    )
    .join("\n")

  const message = `
New Order:
${itemsText}

Total Amount: ₹${total}
  `

  const whatsappURL = `https://wa.me/919871437317?text=${encodeURIComponent(
    message
  )}`

  window.open(whatsappURL, "_blank")
}


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
        <div className="mt-8 border-t pt-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-800 transition"
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  )
}

