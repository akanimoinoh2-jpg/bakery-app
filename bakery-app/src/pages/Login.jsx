import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import dessertImg from '../assets/products/panna-cotta.png'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email.includes('@') || password.length < 6) {
      setError('Invalid email or password')
      return
    }
    signIn(email)
    navigate('/menu')
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-photo">
          <img src={dessertImg} alt="Desserts" />
        </div>
        <div className="signup-body">
          <h1>Welcome back</h1>
          <p className="signup-sub">Log in to add desserts to your cart and see your orders.</p>

          {error && (
            <div className="signup-alert">
              <span className="alert-ico">ⓘ</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={submit} noValidate>
            <label>Email
              <input type="email" placeholder="ada@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>Password
              <div className="pw-wrap">
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="pw-toggle"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPw(!showPw)}
                >
                  {showPw ? '🙈' : '👁'}
                </button>
              </div>
            </label>
            <button className="btn primary block signup-btn">Log in</button>
          </form>

          <p className="signup-foot">
            Don't have an account? <Link to="/create-account">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
