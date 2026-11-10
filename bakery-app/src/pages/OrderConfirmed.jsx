import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function OrderConfirmed() {
  const { orderId } = useParams()
  const order = JSON.parse(localStorage.getItem('bakery-last-order') || 'null')

  return (
    <div className="page">
      <Navbar />
      <div className="empty-state">
        <div className="empty-emoji">🎉</div>
        <h3>Order confirmed!</h3>
        <p>
          Thanks for your order. Your order number is <strong>{orderId}</strong>
          {order && <> and it will be delivered to <strong>{order.address}</strong></>}. We're firing up the ovens!
        </p>
        {order && (
          <div className="summary-card">
            {order.items.map(({ product, qty }) => (
              <div key={product.id} className="row">
                <span>{qty} × {product.name}</span>
                <span>${(product.price * qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="row total"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
          </div>
        )}
        <div className="btn-row">
          <Link className="btn primary" to="/menu">Back to menu</Link>
          <Link className="btn ghost" to="/orders">View my orders</Link>
        </div>
      </div>
    </div>
  )
}
