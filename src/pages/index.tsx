import Head from 'next/head'

import { ProductsState, getProductsList } from '@/store/products.slice'
import ProductCard from '@/components/ProductCard'

import styles from '@/styles/Home.module.scss'
import { wrapper } from '@/store/store'

export default function Home({ productsList }: Partial<ProductsState>) {
  const products = productsList || []

  return (
    <>
      <Head>
        <title>RHDJapan - Home</title>
        <meta
          name="description"
          content="RHDJapan store offers the best quality in products of the brands that you know and trust."
        />

        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getProductsList())
    const { productsSlice } = store.getState()
    return {
      props: productsSlice,
    }
  },
)
