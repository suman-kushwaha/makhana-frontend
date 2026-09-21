import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Layout({ children }) {
  return (
    <>
      {/* ===== TOP MOVING OFFER BANNER ===== */}
      <div className="w-full overflow-hidden bg-orange-600 text-white">
        <div className="veenuts-marquee flex whitespace-nowrap py-2">
          <span className="mx-8 text-sm sm:text-base font-semibold tracking-wide">
            ✨ BUY PREMIUM MAKHANA — WHOLESALE 4 SUTA STARTING AT ₹780/kg &nbsp; | &nbsp;
            WHOLESALE 5 SUTA STARTING AT 1050/Kg  &nbsp; | &nbsp;
            Wholesale 6 SUTA STARTING AT ₹1190/kg &nbsp; | &nbsp;
            PAN-INDIA DELIVERY &nbsp; | &nbsp;
          </span>

          <span className="mx-8 text-sm sm:text-base font-semibold tracking-wide">
            ✨ BUY PREMIUM MAKHANA —  WHOLESALE 4 SUTA STARTING AT ₹780/kg &nbsp; | &nbsp;
             WHOLESALE 5 SUTA STARTING AT 1050/kg &nbsp; | &nbsp;
            Wholesale 6 SUTA STARTING AT ₹1190/kg &nbsp; | &nbsp;
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
