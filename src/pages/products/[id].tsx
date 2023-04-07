import {
  convert,
  isLoadingPrice,
  selectCurrencyLabel,
  selectCurrencyValue,
  setCurrencysLabelState,
  setCurrencysValueState,
} from '@/store/currency.slice'
import { ProductModel, getProductById } from '@/store/products.slice'
import { wrapper } from '@/store/store'

import styles from '@/styles/ProductDetails.module.scss'

import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function formatCurrency(symbol: string, value: number): string {
  const hasPoint = value.toString().includes('.')
  let decimalValue: string = value.toString()
  if (!hasPoint) {
    decimalValue += '.00'
  }
  switch (symbol) {
    case 'EUR':
      return '€ ' + decimalValue
    case 'JPY':
      return '¥ ' + decimalValue
    case 'GBP':
      return '£ ' + decimalValue
    default:
      return '$ ' + decimalValue
  }
}

function ProductDetail({
  selectedProduct,
}: {
  selectedProduct: ProductModel
}): any {
  const selectedCurrencyLabel = useSelector(selectCurrencyLabel)
  const selectedCurrencyValue = useSelector(selectCurrencyValue)
  const isLoadingCurrencyPrice = useSelector(isLoadingPrice)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    if (selectedCurrencyLabel === 'USD') {
      dispatch(setCurrencysValueState(selectedProduct.price))
    } else {
      dispatch(
        convert({
          to: String(selectedCurrencyLabel),
          from: 'USD',
          amount: selectedProduct.price,
        }),
      )
    }
  }, [selectedProduct, dispatch, selectedCurrencyLabel])

  function onChangeSelect(event: any) {
    const newCurrencyLabel = event.target.value

    if (newCurrencyLabel === 'USD') {
      dispatch(setCurrencysValueState(selectedProduct.price))
    } else {
      dispatch(
        convert({
          to: newCurrencyLabel,
          from: String(selectedCurrencyLabel),
          amount: Number(selectedCurrencyValue),
        }),
      )
    }
    dispatch(setCurrencysLabelState(newCurrencyLabel))
  }

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
          <Image
            className={styles.productDetails__banner}
            src={selectedProduct.image}
            alt={selectedProduct.title + 'banner'}
            width={600}
            height={900}
            priority
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
          <div className={styles.productDetails__currencyContainer}>
            <label
              htmlFor="currencySelection"
              className={styles.productDetails__currencyLabel}
            >
              {isLoadingCurrencyPrice
                ? 'Calculating price...'
                : 'Select your currency:'}
            </label>
            <select
              id="currencySelection"
              defaultValue={selectedCurrencyLabel}
              onChange={onChangeSelect}
              disabled={isLoadingCurrencyPrice}
              className={styles.productDetails__currency}
            >
              <option value="USD">USD $</option>
              <option value="JPY">JP ¥</option>
              <option value="EUR">EUR €</option>
              <option value="GBP">GBP £</option>
            </select>
          </div>
          <div className={styles.productDetails__priceContainer}>
            <button type="button" className={styles.productDetails__buy}>
              <Image
                src={'/cart.svg'}
                alt="Cart icon"
                width={25}
                height={25}
                className={styles.productDetails__cartIcon}
              />
              Buy
            </button>
            {isLoadingCurrencyPrice ? (
              <div className="la-ball-rotate la-dark la-sm">
                <div></div>
              </div>
            ) : (
              <p className={styles.productDetails__price}>
                {formatCurrency(
                  String(selectedCurrencyLabel),
                  Number(selectedCurrencyValue),
                )}
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export default ProductDetail

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext<any>) => {
    const id = context.params.id
    await store.dispatch(getProductById(id))
    const { productsSlice } = store.getState()
    return {
      props: { selectedProduct: productsSlice.selectedProduct },
    }
  },
)
