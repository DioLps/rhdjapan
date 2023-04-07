import Head from 'next/head'

import styles from '@/styles/Home.module.scss'

import ProductService from '@/services/product.service'
import { ProductModel } from '@/store/products.slice'
import ProductCard from '@/components/ProductCard'

export default function Home({ products }: { products: Array<ProductModel> }) {
  return (
    <>
      <Head>
        <title>RHDJapan - Home</title>
        <meta
          name="description"
          content="RHDJapan store offers the best quality in products of the brands that you know and trust."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.home}>
        {products.map((product, i) => {
          return <ProductCard product={product} key={i} />
        })}
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const products = await ProductService.getProducts()
  return {
    props: { products },
  }
}
