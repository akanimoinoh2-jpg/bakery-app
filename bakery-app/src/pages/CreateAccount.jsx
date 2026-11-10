import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import dessertImg from '../assets/products/tiramisu.png'

export default function CreateAccount() {
  const { setPending } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) return setError('Please enter your name.')
    if (!form.email.includes('@')) return setError('Please enter a valid email.')

    if (form.password.length < 6) return setError('Password must be at least 6 characters')
    setPending(form)
    navigate('/verify')
  }

  const F = (k) => ({
    value: form[k],
    onChange: (e) => setForm({ ...form, [k]: e.target.value }),
  })

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-photo">
          <img src={dessertImg} alt="Desserts" />
        </div>
        <div className="signup-body">
          <h1>Create your account</h1>
          <p className="signup-sub">Save your cart and keep track of your orders.</p>

          {error && (
            <div className="signup-alert">
              <span className="alert-ico">ⓘ</span>
              <span>
                {error}
                {error.startsWith('Email is already registered') && (
                  <> . <Link to="/login">Log in instead</Link></>
                )}
              </span>
            </div>
          )}

          <form onSubmit={submit} noValidate>
            <label>Name
              <input placeholder="Ada Lovelace" {...F('name')} />
            </label>
            <label>Email
              <input type="email" placeholder="ada@example.com" {...F('email')} />
            </label>
            <label>Password
              <div className={`pw-wrap ${form.password && form.password.length < 6 ? 'pw-error' : ''}`}>
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="•••"
                  {...F('password')}
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
              {form.password && form.password.length < 6 && (
                <span className="pw-hint">Password must be at least 6 characters</span>
              )}
            </label>
            <button className="btn primary block signup-btn">Create account</button>
          </form>

          <p className="signup-foot">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
