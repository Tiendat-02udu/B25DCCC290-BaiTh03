import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Icon } from '../components/Icon'
import { formatPrice } from '../components/formatPrice'
import { removeFromCart, selectCartTotal, updateQuantity } from '../features/cart/cartSlice'

export function CartPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const total = useAppSelector(selectCartTotal)

  if (items.length === 0) {
    return (
      <section className="cart-page">
        <div className="page-title-row"><div><span className="eyebrow">GIỎ HÀNG CỦA BẠN</span><h1>Đang trống một chút.</h1></div></div>
        <div className="empty-cart"><span className="empty-bag"><Icon name="bag" size={30} /></span><h2>Chưa có món đồ nào ở đây</h2><p>Khám phá cửa hàng và tìm một điều nhỏ khiến bạn vui nhé.</p><Link className="button button-dark" to="/">Khám phá cửa hàng <Icon name="arrow" size={17} /></Link></div>
      </section>
    )
  }

  return (
    <section className="cart-page">
      <div className="page-title-row"><div><span className="eyebrow">GIỎ HÀNG CỦA BẠN</span><h1>Món đồ của bạn.</h1></div><Link className="continue-link" to="/">← Tiếp tục mua sắm</Link></div>
      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-table-head"><span>SẢN PHẨM</span><span>SỐ LƯỢNG</span><span>TỔNG CỘNG</span></div>
          {items.map(({ product, quantity }) => (
            <article className="cart-item" key={product.id}>
              <Link className="cart-item-image" to={`/products/${product.id}`}><img src={product.image} alt={product.title} /></Link>
              <div className="cart-item-name"><span>{product.category}</span><Link to={`/products/${product.id}`}>{product.title}</Link><span className="mobile-price">{formatPrice(product.price * quantity)}</span></div>
              <div className="quantity-control">
                <button aria-label="Giảm số lượng" type="button" onClick={() => dispatch(updateQuantity({ productId: product.id, quantity: quantity - 1 }))}><Icon name="minus" size={15} /></button>
                <span>{quantity}</span>
                <button aria-label="Tăng số lượng" type="button" onClick={() => dispatch(updateQuantity({ productId: product.id, quantity: quantity + 1 }))}><Icon name="plus" size={15} /></button>
              </div>
              <strong className="cart-line-total">{formatPrice(product.price * quantity)}</strong>
              <button className="remove-button" type="button" aria-label={`Xóa ${product.title}`} onClick={() => dispatch(removeFromCart(product.id))}><Icon name="trash" size={17} /></button>
            </article>
          ))}
        </div>
        <aside className="order-summary">
          <span className="eyebrow">TÓM TẮT ĐƠN HÀNG</span>
          <h2>Một chút vui sắp đến.</h2>
          <div className="summary-row"><span>Tạm tính</span><span>{formatPrice(total)}</span></div>
          <div className="summary-row"><span>Phí vận chuyển</span><span className="free-shipping">Miễn phí</span></div>
          <div className="summary-rule" />
          <div className="summary-row summary-total"><span>Tổng cộng</span><strong>{formatPrice(total)}</strong></div>
          <Link className="button button-dark checkout-button" to="/checkout">Tiến hành thanh toán <Icon name="arrow" size={18} /></Link>
          <p className="secure-note"><Icon name="lock" size={15} /> Thanh toán an toàn & bảo mật</p>
        </aside>
      </div>
    </section>
  )
}
