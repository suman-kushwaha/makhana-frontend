import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

export default function ProductCard({ product }) {
    const navigate = useNavigate()

    const { cartItems, setCartItems } = useCart()

    const addToCart = () => {
        setCartItems([...cartItems, product])
    }
    const isInCart = cartItems.some(
        (item) => item.id === product.id
    )

    return (
        <div className="border border-gray-300 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="mt-3 font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.weight}</p>
            <p className="mt-1 text-green-700 font-bold">${product.price}</p>

            <div className="mt-4 flex gap-3">
                {isInCart ? (
                    <button
                        onClick={() => navigate("/cart")}
                        className="flex-1 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition"
                    >
                        Go to Cart
                    </button>
                     ) : (
                    <button
                        onClick={addToCart}
                        className="flex-1 bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
                    >
                        Add to Cart
                    </button>
                )}

                <a
                    href={`https://wa.me/919871437317?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(
                        product.name + " (" + product.weight + ")"
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 border border-green-700 text-green-700 py-2 rounded-md hover:bg-green-50 transition text-center">

                    Enquire
                </a>

            </div>


        </div>
    )
}
