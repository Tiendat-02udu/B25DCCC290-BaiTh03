import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'

export function NotFoundPage() {
  return (
    <section className="not-found-page">
      <span className="not-found-number">404</span>
      <span className="eyebrow">HÌNH NHƯ BẠN ĐI LẠC RỒI</span>
      <h1>Trang này không<br /><em>có ở đây.</em></h1>
      <p>Nhưng vẫn còn nhiều món đồ thú vị đang chờ bạn ở cửa hàng.</p>
      <Link className="button button-dark" to="/">Về trang chủ <Icon name="arrow" size={18} /></Link>
    </section>
  )
}
