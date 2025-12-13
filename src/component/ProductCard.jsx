import { useCart } from "../context/CartContext"

export default function ProductCard({ product }) {
    const { cartItems, setCartItems } = useCart()

    const addToCart = () => {
        setCartItems([...cartItems, product])
    }

    return (
        <div className="border rounded-lg p-4 hover:shadow-lg transition">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="mt-3 font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.weight}</p>
            <p className="mt-1 text-green-700 font-bold">${product.price}</p>

            <div className="mt-4 flex gap-3">
                <button
                    onClick={addToCart}
                    className="flex-1 bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition">
                    Add to Cart
                </button>

                <button
                    className="flex-1 border border-green-700 text-green-700 py-2 rounded-md hover:bg-green-50 transition">
                    Enquire
                </button>
            </div>


        </div>
    )
}
