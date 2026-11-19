import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/useAuth'
import { Icon } from '../components/Icon'

interface LoginLocationState {
  from?: {
    pathname?: string
    search?: string
  }
}

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LoginLocationState | null
  const destination = `${state?.from?.pathname ?? '/'}${state?.from?.search ?? ''}`

  if (user) {
    return <div className="page-state"><h2>Bạn đã đăng nhập rồi.</h2><Link className="button button-dark" to="/">Về cửa hàng</Link></div>
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (login(username, password)) {
      navigate(destination, { replace: true })
    } else {
      setError('Tên đăng nhập không được để trống và mật khẩu cần là 123456.')
    }
  }

  return (
    <section className="login-page">
      <div className="login-art">
        <div className="login-art-shape"><span>✳</span><b>little<br />things<br />matter.</b><i>THE SHOPMINI WAY</i></div>
        <span className="login-art-note">A LITTLE JOY, EVERY DAY</span>
      </div>
      <div className="login-panel">
        <span className="eyebrow">CHÀO MỪNG BẠN QUAY LẠI</span>
        <h1>Vui vì bạn<br /><em>ở đây.</em></h1>
        <p className="login-intro">Đăng nhập để tiếp tục hành trình tìm kiếm những điều nhỏ xinh.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Tên đăng nhập</label>
          <div className="input-wrap"><Icon name="user" size={18} /><input id="username" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" placeholder="Tên của bạn" required /></div>
          <label htmlFor="password">Mật khẩu</label>
          <div className="input-wrap"><Icon name="lock" size={18} /><input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" placeholder="Nhập mật khẩu" required /></div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <p className="login-hint">Dùng mật khẩu mẫu <code>123456</code> để đăng nhập.</p>
          <button className="button button-dark login-submit" type="submit">Đăng nhập <Icon name="arrow" size={18} /></button>
        </form>
        <Link className="login-back" to="/">← Quay lại cửa hàng</Link>
      </div>
    </section>
  )
}
