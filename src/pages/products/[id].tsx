import ProductService from '@/services/product.service'
import { ProductModel } from '@/store/products.slice'

import styles from '@/styles/ProductDetails.module.scss'

import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

function ProductDetail({
  selectedProduct,
}: {
  selectedProduct: ProductModel
}): any {
  return (
    <>
      <Head>
        <title>{'RHDJapan - ' + selectedProduct.title}</title>
        <meta name="title" content={selectedProduct.title} />
        <meta name="description" content={selectedProduct.description} />
        <meta name="image" content={selectedProduct.image} />
        <meta name="keywords" content={selectedProduct.category} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={selectedProduct.title} />
        <meta property="og:description" content={selectedProduct.description} />
        <meta property="og:image" content={selectedProduct.image} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={selectedProduct.title} />
        <meta
          property="twitter:description"
          content={selectedProduct.description}
        />
        <meta property="twitter:image" content={selectedProduct.image} />

        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.productDetails}>
        <section className={styles.productDetails__bannerContainer}>
          <img
            className={styles.productDetails__banner}
            src={selectedProduct.image}
            alt={selectedProduct.title + 'banner'}
          />
        </section>
        <section className={styles.productDetails__infoContainer}>
          <h1 className={styles.productDetails__title}>
            {selectedProduct.title}
          </h1>
          <div className={styles.productDetails__meta}>
            <span className={styles.productDetails__category}>
              {selectedProduct.category}
            </span>
            <span className={styles.productDetails__rate}>
              {selectedProduct.rating.rate}
            </span>
          </div>
          <p className={styles.productDetails__description}>
            {selectedProduct.description}
          </p>
          <p className={styles.productDetails__price}>
            {selectedProduct.price}
          </p>
        </section>
      </main>
    </>
  )
}

export default ProductDetail

export async function getServerSideProps(
  context: GetServerSidePropsContext<any>,
) {
  const id = context.params.id
  const selectedProduct = await ProductService.getProductById(id)
  return {
    props: { selectedProduct },
  }
}
