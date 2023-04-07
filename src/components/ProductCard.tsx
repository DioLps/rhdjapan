import { ProductModel } from '@/store/products.slice'

import style from '../styles/ProductCard.module.scss'

function ProductCard({
  product,
}: {
  key?: number
  product: ProductModel
}): any {
  return (
    <a className={style.productCard} href={'/products/' + product.id}>
      <div
        className={style.productCard__banner}
        style={{ backgroundImage: 'url(' + product.image + ')' }}
      ></div>
      <h3 className={style.productCard__title}>{product.title}</h3>
      <div className={style.productCard__metadata}>
        <p className={style.productCard__category}>{product.category}</p>
        <small className={style.productCard__rating}>
          Rating {product.rating.rate} of {product.rating.count} reviews
        </small>
      </div>
      <p className={style.productCard__price}>US$ {product.price}</p>
    </a>
  )
}

export default ProductCard
