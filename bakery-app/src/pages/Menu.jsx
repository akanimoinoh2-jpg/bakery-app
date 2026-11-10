import { useState } from 'react'
import { Link } from 'react-router-dom'
import products, { categories } from '../data/products'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'

export default function Menu() {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const { add } = useCart()

  const list = products.filter(
    (p) =>
      (category === 'all' || p.category === category) &&
      p.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="page">
      <Navbar />
      <section className="hero">
        <div>
          <h1>Freshly baked, every day.</h1>
          <p>Browse our menu of cakes, desserts and pastries — all made in-house with love.</p>
        </div>
      </section>

      <div className="menu-toolbar">
        <div className="chips">
          {categories.map((c) => (
            <button
              key={c}
              className={`chip ${category === c ? 'active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
        <input
          className="search"
          placeholder="Search the menu…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {list.length === 0 ? (
        <div className="empty-state">
          <div className="empty-emoji">🍩</div>
          <h3>No treats found</h3>
          <p>We couldn't find anything matching your search. Try another filter.</p>
          <button className="btn primary" onClick={() => { setCategory('all'); setQuery('') }}>
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid">
          {list.map((p) => (
            <article key={p.id} className="card">
              <Link to={`/product/${p.id}`} className="card-img">
                <img src={p.image} alt={p.name} />
              </Link>
              <div className="card-body">
                <div className="card-top">
                  <Link to={`/product/${p.id}`} className="card-title">{p.name}</Link>
                  <span className="price">${p.price.toFixed(2)}</span>
                </div>
                <div className="rating">★ {p.rating} <span>({p.reviews})</span></div>
                <p className="card-desc">{p.description}</p>
                <button className="btn primary block" onClick={() => add(p.id)}>
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
