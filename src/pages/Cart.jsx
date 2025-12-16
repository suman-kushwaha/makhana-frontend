import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
export default function Cart() {
  const { cartItems, removeFromCart } = useCart()
  const navigate = useNavigate()

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

  /* ================= EMPTY CART ================= */
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
            onClick={() =>{
              navigate("/")
              setTimeout(()=>{
                window.dispatchEvent(
                new CustomEvent("scrollToSection", { detail: "products" })
              )
              },100)
            }}
               className="mt-6 bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition"
          >
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  /* ================= CART WITH ITEMS ================= */
  return (
    <div className="pt-28">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-8">Your Cart</h2>

        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white
                         border border-gray-200 rounded-xl
                         shadow-sm p-4"
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
                    ₹{item.price}
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(index)}
                className="text-red-500 hover:text-red-700 text-lg"
                title="Remove item"
              >
                Remove
              </button>
            </div>
          ))}
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
