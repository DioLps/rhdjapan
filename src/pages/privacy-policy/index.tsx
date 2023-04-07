import Head from 'next/head'

import styles from '@/styles/PrivacyPolicy.module.scss'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>RHDJapan - Privacy Policy</title>
        <meta
          name="description"
          content="RHDJapan store - On this page you will found our Privacy policy."
        />

        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.privacyPolicy}>
        <h1 className={styles.privacyPolicy__title}>Privacy Policy</h1>
        <p className={styles.privacyPolicy__body}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet nemo
          sapiente eligendi tenetur fugit nesciunt totam, suscipit iste dolor
          magni veniam perspiciatis libero accusantium inventore ullam soluta
          placeat et animi.
        </p>
        <p className={styles.privacyPolicy__body}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet nemo
          sapiente <strong>eligendi</strong> tenetur fugit nesciunt totam,
          suscipit iste dolor magni veniam perspiciatis libero accusantium
          inventore ullam soluta placeat et animi.
        </p>
        <p className={styles.privacyPolicy__body}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet nemo
          sapiente eligendi tenetur fugit nesciunt totam, suscipit iste dolor
          magni veniam perspiciatis libero accusantium inventore ullam soluta
          placeat et animi.
        </p>
      </main>
    </>
  )
}
