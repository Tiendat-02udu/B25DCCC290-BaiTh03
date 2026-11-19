import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Icon } from '../components/Icon'
import { formatPrice } from '../components/formatPrice'
import { clearCart, selectCartTotal } from '../features/cart/cartSlice'

export function CheckoutPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const total = useAppSelector(selectCartTotal)
  const [placed, setPlaced] = useState(false)

  if (items.length === 0 && !placed) return <Navigate to="/cart" replace />

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(clearCart())
    setPlaced(true)
  }

  if (placed) {
    return (
      <section className="success-page">
        <span className="success-icon"><Icon name="check" size={32} /></span>
        <span className="eyebrow">ĐẶT HÀNG THÀNH CÔNG</span>
        <h1>Cảm ơn bạn<br /><em>thật nhiều.</em></h1>
        <p>Đơn hàng đã được ghi nhận. Một chút niềm vui đang trên đường đến với bạn.</p>
        <Link className="button button-dark" to="/">Tiếp tục khám phá <Icon name="arrow" size={18} /></Link>
      </section>
    )
  }

  return (
    <section className="checkout-page">
      <div className="page-title-row"><div><span className="eyebrow">BƯỚC CUỐI CÙNG</span><h1>Hoàn tất đơn hàng.</h1></div><Link className="continue-link" to="/cart">← Quay lại giỏ hàng</Link></div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-step"><span>01</span><div><h2>Thông tin giao hàng</h2><p>Để món đồ tìm được đường đến với bạn.</p></div></div>
          <div className="form-grid">
            <label>Họ và tên<input name="name" autoComplete="name" placeholder="Nguyễn An" required /></label>
            <label>Số điện thoại<input name="phone" type="tel" autoComplete="tel" placeholder="090 000 0000" required /></label>
            <label className="field-full">Địa chỉ nhận hàng<input name="address" autoComplete="street-address" placeholder="Số nhà, tên đường, phường/xã..." required /></label>
            <label className="field-full">Email<input name="email" type="email" autoComplete="email" placeholder="ban@email.com" required /></label>
          </div>
          <div className="checkout-step payment-step"><span>02</span><div><h2>Thanh toán</h2><p>Thanh toán khi nhận hàng (COD)</p></div><span className="cod-pill"><Icon name="check" size={15} /> Đã chọn</span></div>
          <button className="button button-dark place-order" type="submit">Đặt hàng <Icon name="arrow" size={18} /></button>
          <p className="secure-note"><Icon name="lock" size={15} /> Thông tin của bạn được bảo mật</p>
        </form>
        <aside className="order-summary checkout-summary">
          <span className="eyebrow">ĐƠN HÀNG CỦA BẠN</span>
          <h2>{items.length} món đồ đã chọn</h2>
          <div className="checkout-items">
            {items.map(({ product, quantity }) => (
              <div className="checkout-item" key={product.id}>
                <div className="checkout-thumb"><img src={product.image} alt="" /><span>{quantity}</span></div>
                <span>{product.title}</span><strong>{formatPrice(product.price * quantity)}</strong>
              </div>
            ))}
          </div>
          <div className="summary-row"><span>Phí vận chuyển</span><span className="free-shipping">Miễn phí</span></div>
          <div className="summary-rule" />
          <div className="summary-row summary-total"><span>Tổng cộng</span><strong>{formatPrice(total)}</strong></div>
        </aside>
      </div>
    </section>
  )
}
