import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Icon } from '../components/Icon'
import { formatPrice } from '../components/formatPrice'
import { addToCart } from '../features/cart/cartSlice'
import { fetchProducts } from '../features/products/productsSlice'

export function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.products)
  const product = items.find((item) => item.id === Number(id))

  useEffect(() => {
    if (status === 'idle') void dispatch(fetchProducts())
  }, [dispatch, status])

  if (status === 'loading' || status === 'idle') {
    return <div className="page-state"><span className="loader" /> Đang tìm món đồ của bạn...</div>
  }
  if (status === 'failed') {
    return <div className="page-state"><h2>Không tải được sản phẩm</h2><p>{error}</p><button className="button button-dark" onClick={() => void dispatch(fetchProducts())}>Thử lại</button></div>
  }
  if (!product) {
    return <div className="page-state"><h2>Không tìm thấy sản phẩm</h2><Link className="button button-dark" to="/">Quay lại cửa hàng</Link></div>
  }

  return (
    <section className="detail-page">
      <div className="breadcrumbs"><Link to="/">Cửa hàng</Link><span>/</span><span>{product.category}</span></div>
      <div className="detail-layout">
        <div className="detail-image"><span className="product-category">{product.category}</span><img src={product.image} alt={product.title} /></div>
        <div className="detail-copy">
          <span className="eyebrow">SHOPMINI SELECTED</span>
          <h1>{product.title}</h1>
          <span className="detail-price">{formatPrice(product.price)}</span>
          <div className="detail-rule" />
          <p className="detail-description">{product.description}</p>
          <div className="detail-perks"><span><Icon name="check" size={16} /> Sản phẩm được chọn lọc</span><span><Icon name="check" size={16} /> Đổi trả trong 7 ngày</span></div>
          <button className="button button-dark detail-add" type="button" onClick={() => dispatch(addToCart(product))}>
            Thêm vào giỏ hàng <Icon name="bag" size={18} />
          </button>
          <Link className="detail-back" to="/">← Tiếp tục khám phá</Link>
        </div>
      </div>
    </section>
  )
}
