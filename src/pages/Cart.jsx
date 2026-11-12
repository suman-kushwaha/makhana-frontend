
import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
  } = useCart()

  const navigate = useNavigate()

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price) * (Number(item.quantity) || 1),
    0
  )

  const handleCheckout = () => {
    const itemsText = cartItems
      .map((item, index) => {
        const quantity = Number(item.quantity) || 1
        const subtotal = Number(item.price) * quantity

        return `${index + 1}. ${item.name} (${item.weight})
Quantity: ${quantity} packet(s)
Price: ₹${item.price} x ${quantity} = ₹${subtotal}`
      })
      .join("\n\n")

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

  /* EMPTY CART */
  if (cartItems.length === 0) {
    return (
      <div className="pt-28">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">🛒</div>

          <h2 className="text-2xl font-semibold text-gray-800">
            Your cart is empty
          </h2>

          <p className="mt-2 text-gray-500">
            Looks like you haven’t added any products yet.
          </p>

          <button
            onClick={() => {
              navigate("/")
              setTimeout(() => {
                window.dispatchEvent(
                  new CustomEvent("scrollToSection", {
                    detail: "products",
                  })
                )
              }, 100)
            }}
            className="mt-6 bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition"
          >
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  /* CART WITH ITEMS */
  return (
    <div className="pt-28">
      <div className="max-w-4xl mx-auto px-4 py-10">

        <h2 className="text-2xl font-semibold mb-8">
          Your Cart
        </h2>

        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems.map((item, index) => {
            const quantity = Number(item.quantity) || 1
            const subtotal = Number(item.price) * quantity

            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-200 rounded-xl shadow-sm p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />

                  <div>
                    <h3 className="font-medium text-gray-800">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {item.weight}
                    </p>

                    <p className="text-green-700 font-semibold mt-1">
                      ₹{item.price} / packet
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5">

                  {/* Quantity Selector */}
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(index, -1)}
                      disabled={quantity <= 1}
                      className="px-3 py-2 text-lg text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span className="px-4 font-semibold text-gray-800">
                      {quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(index, 1)}
                      className="px-3 py-2 text-lg text-gray-700 hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal and Remove */}
                  <div className="text-right min-w-[85px]">
                    <p className="font-semibold text-gray-800">
                      ₹{subtotal}
                    </p>

                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-500 hover:text-red-700 text-sm mt-1"
                    >
                      Remove
                    </button>
                  </div>

                </div>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center text-lg font-semibold mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-800 transition"
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  )
}