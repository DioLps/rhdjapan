import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { wrapper } from '../store/store'
import Header from '../components/Header'
import { PersistGate } from 'redux-persist/integration/react'
import { useStore } from 'react-redux'

function App({ Component, pageProps }: AppProps) {
  const store: any = useStore()
  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <Header />
      <Component {...pageProps} />
    </PersistGate>
  )
}

export default wrapper.withRedux(App)
