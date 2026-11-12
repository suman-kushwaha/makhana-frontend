
import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const removeFromCart = (indexToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    )
  }

  const updateQuantity = (indexToUpdate, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item, index) => {
        if (index === indexToUpdate) {
          const currentQuantity = Number(item.quantity) || 1

          return {
            ...item,
            quantity: Math.max(1, currentQuantity + change),
          }
        }

        return item
      })
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
