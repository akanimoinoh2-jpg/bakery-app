import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import products from '../data/products'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((p) => p.id === id)
  const { add } = useCart()
  const [qty, setQty] = useState(1)

  if (!product) return <div className="page"><Navbar /><p>Product not found.</p></div>

  return (
    <div className="page">
      <Navbar />
      <Link to="/menu" className="back-link">← Back to menu</Link>
      <div className="detail">
        <img className="detail-img" src={product.image} alt={product.name} />
        <div className="detail-info">
          <h1>{product.name}</h1>
          <div className="rating">★ {product.rating} <span>({product.reviews} reviews)</span></div>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-desc">{product.description}</p>
          <div className="ingredients">
            {product.ingredients.map((i) => (
              <span key={i} className="tag">{i}</span>
            ))}
          </div>
          <div className="qty-row">
            <div className="qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button
              className="btn primary"
              onClick={() => { add(product.id, qty); navigate('/cart') }}
            >
              Add to cart · ${(product.price * qty).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
