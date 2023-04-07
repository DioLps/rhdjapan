import Image from 'next/image'
import Link from 'next/link'

import style from '../styles/Header.module.scss'

function Header(): any {
  return (
    <header className={style.header}>
      <Link href="/">
        <Image
          className={style.header__logo}
          src="/vercel.svg"
          alt="website's logo"
          width={100}
          height={30}
        />
      </Link>
      <div className={style.header__links}>
        <Link
          className={style.header__link + ' ' + style.header__onlyDeskTop}
          href="/"
        >
          Home
        </Link>
        <Link className={style.header__link} href="/refund-policy">
          Need a Refund?
        </Link>
        <Link className={style.header__link} href="/privacy-policy">
          Privacy policy
        </Link>
        <Link className={style.header__link} href="/about">
          About us
        </Link>
      </div>
    </header>
  )
}

export default Header
