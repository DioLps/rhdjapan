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
      <p className={style.productCard__price}>US$ {product.price}</p>
    </a>
  )
}

export default ProductCard
