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

  return (
    <div
      className="
        group
        relative
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
        duration-500
        ease-out
        hover:-translate-y-2
        hover:border-green-200
        hover:shadow-[0_18px_45px_rgba(22,101,52,0.14)]
      "
    >

      {/* =========================
          PRODUCT IMAGE
      ========================= */}
      <div className="relative overflow-hidden bg-gray-50">

        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent z-10 pointer-events-none" />

        <img
          src={product.image}
          alt={product.name}
          className="
            w-full
            h-64
            sm:h-72
            object-contain
            p-4
            transition-transform
            duration-700
            ease-out
            group-hover:scale-105
          "
        />

        {/* BEST SELLER */}
        {product.type === "retail" && product.bestseller && (
          <span
            className="
              absolute
              top-4
              left-4
              z-20
              rounded-full
              bg-green-700
              px-3
              py-1.5
              text-xs
              font-semibold
              tracking-wide
              text-white
              shadow-md
            "
          >
            ★ Best Seller
          </span>
        )}

        {/* DISCOUNT BADGE */}
        {product.type === "retail" && product.discount && (
          <span
            className="
              absolute
              top-4
              right-4
              z-20
              rounded-full
              bg-orange-500
              px-3
              py-1.5
              text-xs
              font-bold
              text-white
              shadow-md
            "
          >
            {product.discount} OFF
          </span>
        )}
      </div>

      {/* =========================
          PRODUCT INFORMATION
      ========================= */}
      <div className="flex flex-1 flex-col p-5">

        {/* PRODUCT NAME */}
        <h3
          className="
            text-lg
            font-bold
            tracking-tight
            text-gray-900
            transition-colors
            duration-300
            group-hover:text-green-800
          "
        >
          {product.name}
        </h3>

        {/* =========================
            WHOLESALE
        ========================= */}
        {product.type === "wholesale" ? (
          <div className="mt-3">

            {/* GRADE */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Grade
              </span>

              <span className="text-sm font-semibold text-gray-800">
                {product.grade}
              </span>
            </div>

            {/* SIZE */}
            <p className="mt-2 text-sm text-gray-500">
              {product.size}
            </p>

            {/* PRICE */}
            <div className="mt-4 rounded-xl bg-green-50 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-green-700">
                Wholesale Price
              </p>

              <p className="mt-1 text-xl font-extrabold text-green-800">
                {product.priceRange}
              </p>
            </div>

            {/* NOTE */}
            <p className="mt-3 text-xs leading-relaxed text-gray-400">
              {product.note}
            </p>
          </div>
        ) : (

          /* =========================
             RETAIL
          ========================= */
          <div className="mt-3">

            {/* FLAVOR */}
            <span
              className="
                inline-flex
                items-center
                rounded-full
                bg-orange-50
                px-3
                py-1
                text-xs
                font-semibold
                text-orange-700
                ring-1
                ring-orange-100
              "
            >
              {product.flavor}
            </span>

            {/* WEIGHT */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Weight
              </span>

              <span className="text-sm font-semibold text-gray-700">
                {product.weight}
              </span>
            </div>

            {/* PRICE */}
            <div className="mt-3 flex flex-wrap items-center gap-2">

              <span className="text-2xl font-extrabold text-green-800">
                ₹{product.price}
              </span>

              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}

              {product.discount && (
                <span className="text-xs font-bold text-green-700">
                  {product.discount} OFF
                </span>
              )}
            </div>
          </div>
        )}

        {/* =========================
            BUTTONS
        ========================= */}
        <div className="mt-auto pt-5">

          {product.type === "retail" ? (
            <div className="flex gap-2">

              {/* CART BUTTON */}
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
                    shadow-sm
                    transition-all
                    duration-300
                    hover:bg-gray-900
                    hover:shadow-md
                    active:scale-[0.98]
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
                    shadow-sm
                    transition-all
                    duration-300
                    hover:bg-green-800
                    hover:shadow-md
                    active:scale-[0.98]
                  "
                >
                  Add to Cart
                </button>
              )}

              {/* WHATSAPP ENQUIRE */}
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
                  flex
                  flex-1
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-green-700
                  px-3
                  py-3
                  text-sm
                  font-semibold
                  text-green-700
                  transition-all
                  duration-300
                  hover:bg-green-50
                  hover:shadow-sm
                  active:scale-[0.98]
                "
              >
                Enquire
              </a>
            </div>

          ) : (

            /* WHOLESALE WHATSAPP */
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
                flex
                w-full
                items-center
                justify-center
                rounded-xl
                bg-orange-500
                px-4
                py-3
                text-sm
                font-bold
                text-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-orange-600
                hover:shadow-lg
                active:scale-[0.98]
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