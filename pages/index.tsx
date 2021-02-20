import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>

      <Head>
        <title>DroneZones</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to The DroneZone</h1>
        <h2> You Gotta Log In if You Wanna Do Anything</h2>
        <h3>good luck</h3>
        <h8>and keep an eye on the sky</h8>

      </main>

    </div>
  )
}
