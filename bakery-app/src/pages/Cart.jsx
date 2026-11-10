import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'

export default function Cart() {
  const { items, setQty, remove, subtotal, clear } = useCart()
  const navigate = useNavigate()

  const delivery = subtotal > 0 ? 2.99 : 0
  const total = subtotal + delivery

  return (
    <div className="page">
      <Navbar />
      <h1>Your cart</h1>
      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-emoji">🧺</div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any treats yet.</p>
          <Link to="/menu" className="btn primary">Browse the menu</Link>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="cart-item">
                <img src={product.image} alt={product.name} />
                <div className="cart-item-info">
                  <div className="card-top">
                    <span className="card-title">{product.name}</span>
                    <span className="price">${(product.price * qty).toFixed(2)}</span>
                  </div>
                  <span className="muted">${product.price.toFixed(2)} each</span>
                </div>
                <div className="qty">
                  <button onClick={() => setQty(product.id, qty - 1)}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(product.id, qty + 1)}>+</button>
                </div>
                <button className="remove" onClick={() => remove(product.id)}>✕</button>
              </div>
            ))}
          </div>
          <div className="summary-card">
            <div className="row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="row"><span>Delivery</span><span>${delivery.toFixed(2)}</span></div>
            <div className="row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button className="btn primary block" onClick={() => navigate('/order-summary')}>
              Checkout
            </button>
            <button className="link-btn" onClick={clear}>Clear cart</button>
          </div>
        </>
      )}
    </div>
  )
}
