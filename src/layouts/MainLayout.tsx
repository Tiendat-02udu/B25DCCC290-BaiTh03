import { Link, Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export function MainLayout() {
  return (
    <>
      <Header />
      <main className="page-shell"><Outlet /></main>
      <footer className="site-footer" id="about">
        <div className="footer-inner">
          <Link className="brand footer-brand" to="/"><span className="brand-mark">s</span><span>shop<span>mini</span></span></Link>
          <p>Mua sắm vui hơn, mỗi ngày một chút.</p>
          <span>© 2025 ShopMini</span>
        </div>
      </footer>
    </>
  )
}
