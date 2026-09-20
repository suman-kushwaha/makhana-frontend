import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Layout({ children }) {
  return (
    <>
      {/* ===== TOP MOVING OFFER BANNER ===== */}
      <div className="w-full overflow-hidden bg-orange-600 text-white">
        <div className="veenuts-marquee flex whitespace-nowrap py-2">
          <span className="mx-8 text-sm sm:text-base font-semibold tracking-wide">
            ✨ BUY PREMIUM MAKHANA — STARTING AT ₹220 &nbsp; | &nbsp;
            250g PACKS &nbsp; | &nbsp;
            Wholesale Starting ₹760/kg &nbsp; | &nbsp;
            PAN-INDIA DELIVERY &nbsp; | &nbsp;
          </span>

          <span className="mx-8 text-sm sm:text-base font-semibold tracking-wide">
            ✨ BUY PREMIUM MAKHANA — STARTING AT ₹220 &nbsp; | &nbsp;
            250g PACKS &nbsp; | &nbsp;
            Wholesale Starting ₹760/kg &nbsp; | &nbsp;
            PAN-INDIA DELIVERY &nbsp; | &nbsp;
          </span>
        </div>
      </div>
      <Navbar />

      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
