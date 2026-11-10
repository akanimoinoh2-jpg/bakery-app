import { createContext, useContext, useMemo, useState } from 'react'
import products from '../data/products'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // {id, qty}

  const add = (id, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === id)
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
      return [...prev, { id, qty }]
    })
  }

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  const setQty = (id, qty) => {
    if (qty <= 0) return remove(id)
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
  }

  const clear = () => setItems([])

  const detailed = useMemo(
    () =>
      items.map((i) => ({ ...i, product: products.find((p) => p.id === i.id) })).filter((i) => i.product),
    [items]
  )

  const subtotal = useMemo(() => detailed.reduce((s, i) => s + i.product.price * i.qty, 0), [detailed])
  const count = useMemo(() => detailed.reduce((s, i) => s + i.qty, 0), [detailed])

  return (
    <CartContext.Provider value={{ items: detailed, add, remove, setQty, clear, subtotal, count }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
