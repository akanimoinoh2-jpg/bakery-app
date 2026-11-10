import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()

  return (
    <header className="navbar">
      <Link to="/menu" className="brand">
        <span className="brand-mark">🧁</span>
        <span className="brand-name">Bake<span className="accent">house</span></span>
      </Link>
      <nav className="nav-links">
        <Link to="/menu">Menu</Link>
        <Link to="/orders">My Orders</Link>
      </nav>
      <div className="nav-actions">
        <button className="icon-btn" onClick={() => navigate('/cart')} aria-label="Cart">
          🛒
          {count > 0 && <span className="cart-badge">{count}</span>}
        </button>
        {user && (
          <button className="btn ghost small" onClick={signOut}>
            Sign out
          </button>
        )}
      </div>
    </header>
  )
}
