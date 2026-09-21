import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const { cartItems, setCartItems } = useCart();

  const addToCart = () => {
    const existingItem = cartItems.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const isInCart = cartItems.some(
    (item) => item.id === product.id
  );

  // AUTOMATIC DISCOUNT CALCULATION
  const discountPercentage =
    product.originalPrice && product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  return (
    <div
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* ================= IMAGE ================= */}
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="
            h-full
            w-full
            object-contain
            p-4
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* BEST SELLER */}
        {product.type === "retail" && product.bestseller && (
          <span
            className="
              absolute
              left-3
              top-3
              rounded-md
              bg-green-700
              px-2.5
              py-1
              text-xs
              font-bold
              text-white
              shadow-sm
            "
          >
            Best Seller
          </span>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-1 flex-col p-5">

        {/* PRODUCT TITLE */}
        <h3
          className="
            min-h-[52px]
            text-lg
            font-bold
            leading-6
            text-gray-900
          "
        >
          {product.name}
        </h3>

        {/* ================= WHOLESALE ================= */}
        {product.type === "wholesale" ? (
          <div className="mt-2">

            <p className="text-sm text-gray-500">
              Grade:
              <span className="ml-1 font-semibold text-gray-800">
                {product.grade}
              </span>
            </p>

            <p className="mt-1 min-h-[20px] text-sm text-gray-500">
              {product.size}
            </p>

            {/* WHOLESALE PRICE */}
            <div className="mt-4 rounded-xl bg-green-50 px-4 py-3">
              <p className="text-xl font-extrabold text-green-800">
                {product.priceRange}
              </p>

              {product.note && (
                <p className="mt-1 text-xs text-gray-500">
                  {product.note}
                </p>
              )}
            </div>

          </div>
        ) : (
          /* ================= RETAIL ================= */
          <div className="mt-2">

            {/* FLAVOR */}
            <div className="min-h-[30px]">
              {product.flavor && (
                <span
                  className="
                    inline-flex
                    rounded-full
                    bg-orange-50
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-orange-700
                  "
                >
                  {product.flavor}
                </span>
              )}
            </div>

            {/* WEIGHT */}
            <div className="mt-3 flex min-h-[24px] items-center gap-2">
              <span className="text-sm font-medium uppercase tracking-wide text-gray-500">
                Weight
              </span>

              <span className="text-sm font-semibold text-gray-800">
                {product.weight}
              </span>
            </div>

            {/* ================= PRICE ROW ================= */}
            <div className="mt-4 flex min-h-[38px] flex-wrap items-center gap-x-2 gap-y-1">

              {/* CURRENT PRICE */}
              <span className="text-2xl font-extrabold leading-none text-gray-800">
                ₹{product.price}/
              </span>

              {/* ORIGINAL PRICE */}
              {product.originalPrice && (
                <span className="text-sm font-medium text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}

              {/* DISCOUNT */}
              {discountPercentage > 0 && (
                <span
                  className="
                    rounded-full
                    bg-orange-100
                    px-2.5
                    py-1
                    text-xs
                    font-bold
                    text-orange-700
                    whitespace-nowrap
                  "
                >
                  {discountPercentage}% OFF
                </span>
              )}
            </div>
          </div>
        )}

        {/* ================= BUTTONS ================= */}
        <div className="mt-auto pt-6">

          {product.type === "retail" ? (
            <div className="flex gap-3">

              {/* ADD TO CART */}
              {isInCart ? (
                <button
                  onClick={() => navigate("/cart")}
                  className="
                    flex-1
                    rounded-xl
                    bg-gray-800
                    px-3
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-gray-900
                  "
                >
                  Go to Cart
                </button>
              ) : (
                <button
                  onClick={addToCart}
                  className="
                    flex-1
                    rounded-xl
                    bg-green-700
                    px-3
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-green-800
                  "
                >
                  Add to Cart
                </button>
              )}

              {/* ENQUIRE */}
              <a
                href={`https://wa.me/919871437317?text=${encodeURIComponent(
                  `Hi, I am interested in:\n\n` +
                    `Product: ${product.name}\n` +
                    `Weight: ${product.weight}\n` +
                    `Price: ₹${product.price}\n\n` +
                    `Please share more details.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="
                  flex-1
                  rounded-xl
                  border
                  border-green-700
                  px-3
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-green-700
                  transition
                  hover:bg-green-50
                "
              >
                Enquire
              </a>

            </div>
          ) : (
            <a
              href={`https://wa.me/919871437317?text=${encodeURIComponent(
                `Hi, I am interested in the following wholesale product:\n\n` +
                  `Product: ${product.name}\n` +
                  `Grade: ${product.grade}\n` +
                  `Size: ${product.size}\n` +
                  `Price Range: ${product.priceRange}\n\n` +
                  `Please share more details.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="
                block
                w-full
                rounded-xl
                bg-orange-500
                px-4
                py-3
                text-center
                text-sm
                font-bold
                text-white
                transition
                hover:bg-orange-600
              "
            >
              Order on WhatsApp
            </a>
          )}

        </div>
      </div>
    </div>
  );
}