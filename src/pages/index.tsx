import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Head from 'next/head'

import { getProductsList, selectAllProducts } from '@/store/products.slice'
import ProductCard from '@/components/ProductCard'

import styles from '@/styles/Home.module.scss'

export default function Home() {
  const products = useSelector(selectAllProducts) || []
  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(getProductsList())
  }, [])

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
