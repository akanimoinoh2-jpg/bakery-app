import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

export default function OrderSummary() {
  const { items, subtotal, clear } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [placing, setPlacing] = useState(false)

  const [form, setForm] = useState({
    name: user?.name || '',
    address: '',
    city: '',
    phone: '',
    payment: 'card',
  })

  if (items.length === 0) {
    return (
      <div className="page">
        <Navbar />
        <div className="empty-state">
          <div className="empty-emoji">🧺</div>
          <h3>Nothing to check out</h3>
          <p>Your cart is empty — add some treats first.</p>
          <a className="btn primary" href="/menu">Browse the menu</a>
        </div>
      </div>
    )
  }

  const delivery = 2.99
  const total = subtotal + delivery

  const placeOrder = (e) => {
    e.preventDefault()
    setPlacing(true)
    setTimeout(() => {
      const orderId = 'BK-' + Math.floor(1000 + Math.random() * 9000)
      localStorage.setItem('bakery-last-order', JSON.stringify({
        id: orderId,
        items,
        total,
        address: `${form.address}, ${form.city}`,
        date: new Date().toLocaleString(),
      }))
      const prev = JSON.parse(localStorage.getItem('bakery-orders') || '[]')
      localStorage.setItem('bakery-orders', JSON.stringify([{
        id: orderId, items, total, address: `${form.address}, ${form.city}`,
        date: new Date().toLocaleString(),
      }, ...prev]))
      clear()
      navigate(`/order-confirmed/${orderId}`)
    }, 900)
  }

  return (
    <div className="page">
      <Navbar />
      <h1>Order summary</h1>
      <div className="summary-grid">
        <form className="checkout-form" onSubmit={placeOrder}>
          <h3>Delivery details</h3>
          <label>Full name
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label>Street address
            <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </label>
          <label>City
            <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          </label>
          <label>Phone
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </label>
          <h3>Payment</h3>
          <div className="pay-options">
            {['card', 'cash'].map((p) => (
              <label key={p} className={`pay-opt ${form.payment === p ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value={p}
                  checked={form.payment === p}
                  onChange={() => setForm({ ...form, payment: p })}
                />
                {p === 'card' ? '💳 Card' : '💵 Cash on delivery'}
              </label>
            ))}
          </div>
          <button className="btn primary block" disabled={placing}>
            {placing ? 'Placing order…' : `Place order · $${total.toFixed(2)}`}
          </button>
        </form>
        <aside className="summary-card">
          <h3>Items</h3>
          {items.map(({ product, qty }) => (
            <div key={product.id} className="row">
              <span>{qty} × {product.name}</span>
              <span>${(product.price * qty).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className="row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="row"><span>Delivery</span><span>${delivery.toFixed(2)}</span></div>
          <div className="row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </aside>
      </div>
    </div>
  )
}
