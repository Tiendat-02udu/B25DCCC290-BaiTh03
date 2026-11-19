import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCartQuantity } from '../features/cart/cartSlice'
import { useAuth } from '../contexts/useAuth'
import { useTheme } from '../contexts/useTheme'
import { Icon } from './Icon'

export function Header() {
  const cartCount = useAppSelector(selectCartQuantity)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="ShopMini - Trang chủ">
          <span className="brand-mark"><Icon name="spark" size={18} /></span>
          <span>shop<span>mini</span></span>
        </Link>
        <nav className="main-nav" aria-label="Điều hướng chính">
          <Link to="/">Cửa hàng</Link>
          <Link to="/#about">Về chúng tôi</Link>
        </nav>
        <div className="header-actions">
          {user ? (
            <div className="user-chip">
              <span className="avatar">{user.username.slice(0, 1).toUpperCase()}</span>
              <span className="user-name">{user.username}</span>
              <button className="text-button" type="button" onClick={logout}>Đăng xuất</button>
            </div>
          ) : (
            <Link className="login-link" to="/login"><Icon name="user" size={17} /> Đăng nhập</Link>
          )}
          <button
            className="icon-button theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Bật giao diện tối' : 'Bật giao diện sáng'}
            title={theme === 'light' ? 'Giao diện tối' : 'Giao diện sáng'}
          >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} size={18} />
          </button>
          <Link className="cart-link" to="/cart" aria-label={`Giỏ hàng, ${cartCount} sản phẩm`}>
            <Icon name="bag" size={19} />
            <span className="cart-label">Giỏ hàng</span>
            <span className="cart-count">{cartCount}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
