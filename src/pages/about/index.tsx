import Head from 'next/head'

import styles from '@/styles/About.module.scss'

export default function AboutUS() {
  return (
    <>
      <Head>
        <title>RHDJapan - About Us</title>
        <meta name="description" content="RHDJapan store - About Us." />

        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.about}>
        <h1 className={styles.about__title}>About Us</h1>
        <p className={styles.about__body}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet nemo
          sapiente eligendi tenetur fugit nesciunt totam, suscipit iste dolor
          magni veniam perspiciatis libero accusantium inventore ullam soluta
          placeat et animi.
        </p>
        <p className={styles.about__body}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet nemo
          sapiente <strong>eligendi</strong> tenetur fugit nesciunt totam,
          suscipit iste dolor magni veniam perspiciatis libero accusantium
          inventore ullam soluta placeat et animi.
        </p>
        <p className={styles.about__body}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet nemo
          sapiente eligendi tenetur fugit nesciunt totam, suscipit iste dolor
          magni veniam perspiciatis libero accusantium inventore ullam soluta
          placeat et animi.
        </p>
      </main>
    </>
  )
}
