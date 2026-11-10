import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Orders() {
  const orders = JSON.parse(localStorage.getItem('bakery-orders') || '[]')

  return (
    <div className="page">
      <Navbar />
      <h1>My orders</h1>
      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-emoji">📦</div>
          <h3>No orders yet</h3>
          <p>When you place an order it will show up here.</p>
          <Link className="btn primary" to="/menu">Browse the menu</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((o) => (
            <div key={o.id} className="order-card">
              <div className="order-head">
                <span className="order-id">{o.id}</span>
                <span className="order-date">{o.date}</span>
                <span className="order-status">Delivered</span>
              </div>
              <div className="order-items">
                {o.items.map(({ product, qty }) => (
                  <div key={product.id} className="row">
                    <span>{qty} × {product.name}</span>
                    <span>${(product.price * qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="row total"><span>Total</span><span>${o.total.toFixed(2)}</span></div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
