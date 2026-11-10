import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Verify() {
  const { pending, signIn } = useAuth()
  const navigate = useNavigate()
  const [code, setCode] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  const refs = [useRef(), useRef(), useRef(), useRef()]

  const EXPECTED = '1234' // demo verification code

  const handle = (i, val) => {
    if (!/^\d?$/.test(val)) return
    const next = [...code]
    next[i] = val
    setCode(next)
    if (val && i < 3) refs[i + 1].current.focus()
  }

  const submit = (e) => {
    e.preventDefault()
    if (code.join('') === EXPECTED) {
      signIn(pending?.email || 'guest@bakehouse.com')
      navigate('/menu')
    } else {
      setError('Incorrect code. For this demo, use 1234.')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand big">🧁 Bake<span className="accent">house</span></div>
        <h1>Verify your email</h1>
        <p className="muted">
          We sent a 4-digit code to <strong>{pending?.email || 'your email'}</strong>.
          (Demo code: <strong>1234</strong>)
        </p>
        {error && <div className="alert">{error}</div>}
        <form onSubmit={submit}>
          <div className="otp-row">
            {code.map((d, i) => (
              <input
                key={i}
                ref={refs[i]}
                className="otp"
                maxLength={1}
                inputMode="numeric"
                value={d}
                onChange={(e) => handle(i, e.target.value)}
              />
            ))}
          </div>
          <button className="btn primary block">Verify & continue</button>
        </form>
      </div>
    </div>
  )
}
