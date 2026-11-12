
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
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...product, quantity: 1 },
      ]);
    }
  };

  const isInCart = cartItems.some(
    (item) => item.id === product.id
  );

  const discountPercentage =
    product.originalPrice && product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  const savings = product.originalPrice && product.price
    ? product.originalPrice - product.price
    : 0;

  const isWholesale = product.type === "wholesale";

  const whatsappMessage = isWholesale
    ? `Hi, I am interested in the following wholesale product:

Product: ${product.name}
Grade: ${product.grade}
Size: ${product.size}
Price Range: ${product.priceRange}

Please share more details.`
    : `Hi, I am interested in:

Product: ${product.name}
Weight: ${product.weight}
Price: ₹${product.price}

Please share more details.`;

  const whatsappLink = `https://wa.me/919871437317?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <article
      className="
        group relative flex h-full flex-col
        overflow-hidden rounded-2xl
        border border-[#e5e7eb] bg-white
        shadow-sm
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
       
{/* IMAGE SECTION */}
<div className="
  relative flex h-45 w-full  bg-white 
  aspect-square
  items-center justify-center
  overflow-hidden bg-[#f5f1e8]
">

  {/* Decorative circle - retail only
  {!isWholesale && (
    <div className="
      absolute h-48 w-48 rounded-full
      bg-[#e8e9d9] opacity-60
      transition-transform duration-700
      group-hover:scale-125
    " />
  )} */}

  {/* PRODUCT IMAGE */}
  <img
    src={product.image}
    alt={product.name}
    className={`
      relative z-10 h-full w-full
      transition-transform duration-700
      group-hover:scale-105
      ${
        isWholesale
          ? "object-cover object-center"
          : "object-contain p-5 group-hover:scale-110"
      }
    `}
  />

  {/* BESTSELLER */}
  {product.type === "retail" && product.bestseller && (
    <span className="
      absolute left-4 top-4 z-20
      rounded-full bg-[#294d35]
      px-3 py-1.5 text-[10px]
      font-bold uppercase tracking-wider
      text-white shadow-md
    ">
      ★ Bestseller
    </span>
  )}

  {/* DISCOUNT */}
  {!isWholesale && discountPercentage > 0 && (
    <span className="
      absolute right-4 top-4 z-20
      rounded-full bg-[#e98b43]
      px-3 py-1.5 text-xs
      font-bold text-white shadow-md
    ">
      {discountPercentage}% OFF
    </span>
  )}

  {/* WHOLESALE BADGE */}
  {isWholesale && (
    <span className="
      absolute left-4 top-4 z-20
      rounded-full bg-[#e88742]
      px-3 py-1.5 text-[10px]
      font-bold uppercase tracking-wider
      text-white shadow-md
    ">
      Bulk Pricing
    </span>
  )}

  {/* BRAND LABEL */}
  <div className="
    absolute bottom-3 right-4 z-20
    rounded-full border border-white/70
    bg-white/85 px-3 py-1
    text-[10px] font-semibold
    tracking-wide text-[#52634c]
    backdrop-blur-sm
  ">
    VEENUTS • QUALITY FIRST
  </div>

</div>


      {/* PRODUCT DETAILS */}
      <div className="flex flex-1 flex-col p-4">

        {/* CATEGORY LABEL */}
        <p className="
          mb-2 text-[10px] font-bold uppercase
          tracking-[0.18em] text-[#a17b50]
        ">
          {isWholesale ? "Wholesale Collection" : "Retail Collection"}
        </p>

        {/* PRODUCT NAME */}
        <h3 className="
          min-h-[32px] text-[17px] font-semibold
          leading-tight text-[#263c50]
          transition-colors duration-300
          group-hover:text-[#1d8488] line-clamp-2
        ">
          
          {product.name}
        </h3>
           {/* PRODUCT DESCRIPTION */}
           {product.description && (
            <p className="
            mt-1.5 min-h-[36px]
            text-[13px] leading-1.4
             text-gray-500 line-clamp-3
                  ">
             {product.description}
            </p>
             )}

             
{/* VEENUTS QUALITY INDICATOR */}
<div className="flex items-center gap-2 mt-2">
  <div className="flex items-center text-sm">
    <span className="text-[#e5a12b]">★★★★</span>

    <span className="relative inline-block text-gray-300">
      ★
      <span className="absolute top-0 left-0 w-1/2 overflow-hidden text-[#e5a12b]">
        ★
      </span>
    </span>
  </div>

  <span className="text-xs font-semibold text-gray-600">
    4.5/5
  </span>
</div>


        {/* WHOLESALE DETAILS */}
        {isWholesale ? (
          <div className="mt-2 space-y-1.5">

            <div className="
              flex items-center justify-between
              border-b border-dashed border-[#e5e1d7]
              pb-2
            ">
              <span className="text-sm text-gray-500">
                Grade
              </span>
              <span className="text-sm font-semibold text-[#344c36]">
                {product.grade}
              </span>
            </div>

            <div className="
              flex items-center justify-between
              border-b border-dashed border-[#e5e1d7]
              pb-2
            ">
              <span className="text-sm text-gray-500">
                Size
              </span>
              <span className="text-sm font-semibold text-[#344c36]">
                {product.size}
              </span>
            </div>

            <div className="
              mt-3 rounded-xl
              border border-[#e1e9dc]
            bg-[#f0f5ed] p-3
            ">
              <p className="
                mb-1 text-[10px] font-bold uppercase
                tracking-widest text-[#71866a]
              ">
                Wholesale Price
              </p>

              <p className="text-2xl font-bold text-[#294d35]">
                {product.priceRange}
              </p>

              {product.note && (
                <p className="mt-2 text-xs leading-5 text-gray-500">
                  {product.note}
                </p>
              )}
            </div>
          </div>
        ) : (
          /* RETAIL DETAILS */
          <div className="mt-2">

            {/* FLAVOR */}
            <div className="min-h-[30px]">
              {product.flavor && (
                <span className="
                  inline-flex items-center gap-1.5
                  rounded-full bg-[#fff0df]
                  px-3 py-1.5
                  text-xs font-bold text-[#b76a30]
                ">
                  <span>✦</span>
                  {product.flavor}
                </span>
              )}
            </div>

            {/* WEIGHT */}
            <div className="
              mt-2 flex items-center gap-2
              text-sm text-gray-500
            ">
              <span className="text-[#7b956d]">◈</span>
              <span>Net Weight:</span>
              <span className="font-bold text-[#344c36]">
                {product.weight}
              </span>
            </div>

            {/* PRICE BOX */}
            <div className="
              mt-3 rounded-xl
              border border-[#eee9dc]
              bg-[#faf8f1] p-3
            ">
              <div className="flex flex-wrap items-center gap-2">

                <span className="
                  text-2xl font-semibold
                  tracking-tight text-[#294d35]
                ">
                  ₹{product.price}
                </span>

                {product.originalPrice && (
                  <span className="
                    text-sm font-medium
                    text-gray-400 line-through
                  ">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              {discountPercentage > 0 && (
                <div className="
                  mt-2 flex items-center gap-1
                  text-xs font-semibold text-[#b66b34]
                ">
                  <span>✦</span>
                  You save ₹{savings} on this pack!
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* BUTTON SECTION */}
        <div className="mt-auto pt-4">

          {isWholesale ? (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="
                flex w-full items-center justify-center
                gap-2 rounded-xl
                bg-[#e88742] px-4 py-3.5
                text-sm font-bold text-white
                shadow-sm transition-all duration-300
                hover:bg-[#d87632] hover:shadow-lg
                active:scale-[0.98]
              "
            >
              <span>Order on WhatsApp</span>
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          ) : (
            <div className="flex gap-2">

              {/* ADD TO CART */}
              {isInCart ? (
                <button
                  onClick={() => navigate("/cart")}
                  className="
                    flex-1 rounded-xl
                    bg-[#1d8488] px-3 py-3.5
                    text-sm font-bold text-white
                    transition-all duration-300
                    hover:bg-[#1d3b27]
                  "
                >
                  ✓ Go to Cart
                </button>
              ) : (
                <button
                  onClick={addToCart}
                  className="
                    flex-1 rounded-xl
                    bg-[#1d8488] px-3 py-3.5
                    text-sm font-bold text-white
                    shadow-sm transition-all duration-300
                    hover:bg-[#1d8490] hover:shadow-lg
                    active:scale-[0.98]
                  "
                >
                  + Add to Cart
                </button>
              )}

              {/* WHATSAPP */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                aria-label={`Enquire about ${product.name} on WhatsApp`}
                className="
                  flex items-center justify-center
                  rounded-xl border border-[#1d8488]
                  px-4 py-3.5
                  text-sm font-bold text-[#1d8488]
                  transition-all duration-300
                  hover:bg-[#edf3e9] hover:text-[#1d3b27]
                "
              >
                Enquire
              </a>

            </div>
          )}
        </div>
      </div>
    </article>
  );
}
