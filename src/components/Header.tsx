import Image from 'next/image'
import Link from 'next/link'

import style from '../styles/Header.module.scss'

function Header(): any {
  return (
    <header className={style.header}>
      <Link href="/">
        <Image src="/vercel.svg" alt="website's logo" width={100} height={30} />
      </Link>
    </header>
  )
}

export default Header
