import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Icon } from '../components/Icon'
import { ProductCard } from '../components/ProductCard'
import { fetchProducts } from '../features/products/productsSlice'

export function HomePage() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.products)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Tất cả')

  useEffect(() => {
    if (status === 'idle') void dispatch(fetchProducts())
  }, [dispatch, status])

  const categories = useMemo(
    () => ['Tất cả', ...new Set(items.map((product) => product.category))],
    [items],
  )
  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase()
    return items.filter((product) => {
      const matchesName = product.title.toLowerCase().includes(term)
      const matchesCategory = category === 'Tất cả' || product.category === category
      return matchesName && matchesCategory
    })
  }, [category, items, search])
  const featuredProduct = items.find((product) => product.id === 3) ?? items[0]

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> SHOPMINI · CHỌN LỌC MỖI NGÀY</span>
          <h1>Những điều<br />nhỏ <em>thật hay.</em></h1>
          <p>Một cửa hàng nhỏ với những món đồ hữu ích, đẹp vừa đủ và dễ dàng đồng hành cùng bạn mỗi ngày.</p>
          <a className="button button-dark hero-button" href="#products">Khám phá cửa hàng <Icon name="arrow" size={18} /></a>
          <div className="hero-note"><span className="hero-note-rule" /> <span>Chọn lựa giản dị cho cuộc sống thường ngày</span></div>
        </div>
        <div className="hero-art">
          <div className="hero-art-heading"><span>SHOPMINI COLLECTION</span><span>01 — 04</span></div>
          <div className="hero-art-stage">
            {featuredProduct ? (
              <Link className="hero-product-image" to={`/products/${featuredProduct.id}`}>
                <img src={featuredProduct.image} alt={featuredProduct.title} />
              </Link>
            ) : (
              <div className="hero-art-placeholder" aria-hidden="true" />
            )}
          </div>
          <div className="hero-art-caption"><span>MÓN ĐỒ CỦA NGÀY</span><span>Đẹp vừa đủ, dùng thật lâu.</span></div>
        </div>
      </section>

      <section className="shop-section" id="products">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MUA SẮM THẬT VUI</span>
            <h2>Món đồ được yêu thích</h2>
            <p>Một chút xinh xắn cho hôm nay của bạn.</p>
          </div>
          <label className="search-box">
            <Icon name="search" size={18} />
            <input
              type="search"
              placeholder="Tìm sản phẩm..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Tìm sản phẩm theo tên"
            />
          </label>
        </div>

        <div className="category-row" aria-label="Danh mục sản phẩm">
          {categories.map((item) => (
            <button
              className={`category-chip${category === item ? ' active' : ''}`}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        {status === 'loading' && (
          <div className="product-grid">
            {Array.from({ length: 8 }, (_, index) => <div className="product-skeleton" key={index}><div /><span /><i /></div>)}
          </div>
        )}
        {status === 'failed' && (
          <div className="state-card">
            <span className="state-icon"><Icon name="spark" size={24} /></span>
            <h3>Chưa tải được sản phẩm</h3>
            <p>{error}</p>
            <button className="button button-dark" type="button" onClick={() => void dispatch(fetchProducts())}>Thử lại <Icon name="arrow" size={17} /></button>
          </div>
        )}
        {status === 'succeeded' && filteredProducts.length > 0 && (
          <div className="product-grid">
            {filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>
        )}
        {status === 'succeeded' && filteredProducts.length === 0 && (
          <div className="empty-search"><Icon name="search" size={24} /><h3>Chưa tìm thấy sản phẩm</h3><p>Thử một từ khóa khác nhé.</p></div>
        )}
        {status === 'succeeded' && items.length > 0 && (
          <div className="collection-note"><span>01 — 04</span><p>Đồ tốt, chọn bằng cả trái tim.</p><span>{filteredProducts.length} sản phẩm</span></div>
        )}
      </section>
      <section className="quote-banner">
        <span className="quote-spark">✳</span>
        <p>“Niềm vui đôi khi chỉ là một món đồ nhỏ<br />đến đúng lúc.”</p>
        <span className="quote-caption">SHOPMINI DAILY NOTE — NO. 014</span>
      </section>
    </>
  )
}
