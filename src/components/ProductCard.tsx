import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import type { Product } from '../types'
import { formatPrice } from './formatPrice'
import { Icon } from './Icon'

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const dispatch = useAppDispatch()
  return (
    <article className="product-card" style={{ animationDelay: `${index * 45}ms` }}>
      <Link className="product-image-wrap" to={`/products/${product.id}`}>
        <span className="product-category">{product.category}</span>
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>
      <div className="product-info">
        <Link className="product-title" to={`/products/${product.id}`}>{product.title}</Link>
        <div className="product-bottom">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button
            type="button"
            className="add-button"
            onClick={() => dispatch(addToCart(product))}
            aria-label={`Thêm ${product.title} vào giỏ hàng`}
          >
            <Icon name="plus" size={17} />
          </button>
        </div>
      </div>
    </article>
  )
}
