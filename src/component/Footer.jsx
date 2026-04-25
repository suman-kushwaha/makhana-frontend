import { useNavigate } from "react-router-dom"
export default function Footer() {
  const navigate = useNavigate()

  const handleFooterScroll = (section) =>{
    if(window.location.pathname !== "/"){
      navigate("/")
      setTimeout(()=>{
        window.dispatchEvent(
          new CustomEvent("scrollToSection", {detail: section})
        )
      },100)
    }else{
      window.dispatchEvent(
        new CustomEvent("scrollToSection",{detail: section})
      )
    }
  } 
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">
            MakhanaMart
          </h3>
          <p className="text-sm">
            Premium quality makhana sourced directly from farmers and
            processed under hygienic conditions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:text-green-600"
            onClick={()=>handleFooterScroll("home")}>Home</li>

            <li className="cursor-pointer hover:text-green-600"
            onClick={()=>handleFooterScroll("products")}>
              Products
            </li>
            
            <li className="cursor-pointer hover:text-green-600"
            onClick={()=>handleFooterScroll("about")}>About
            </li>

            <li className="cursor-pointer hover:text-green-600"
            onClick={()=>handleFooterScroll("enquiry")}>Enquiry

            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>📍 Bihar, India</li>
            <li>Phone: +91 98714 37317</li>
            <li>Email: contact@veenuts.in</li>
            <li>Website: www.veenuts.com</li>
          </ul>
        </div>

        {/* Certifications */}
        <div>
          <h4 className="text-white font-semibold mb-3">Certifications</h4>
          <ul className="space-y-2 text-sm">
            <li>✔ FSSAI Certified</li>
            <li>✔ ISO 22000</li>
            <li>✔ HACCP</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} MakhanaMart. All rights reserved.
      </div>
    </footer>
  )
}
