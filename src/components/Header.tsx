import Image from 'next/image'
import Link from 'next/link'

import style from '../styles/Header.module.scss'
import MenuHamburger from './MenuHamburger'

function Header(): any {
  const desktopOnlyClass = style.header__link + ' ' + style.header__onlyDeskTop
  return (
    <header className={style.header}>
      <Link href="/">
        <Image
          className={style.header__logo}
          src="/alogo-4.svg"
          alt="website's logo"
          width={90}
          height={30}
        />
      </Link>
      <div className={style.header__links}>
        <Link className={desktopOnlyClass} href="/">
          Home
        </Link>
        <Link className={desktopOnlyClass} href="/refund-policy">
          Need a Refund?
        </Link>
        <Link className={desktopOnlyClass} href="/privacy-policy">
          Privacy policy
        </Link>
        <Link className={desktopOnlyClass} href="/about">
          About us
        </Link>
        <MenuHamburger>
          <Link className={style.header__link} href="/">
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
        </MenuHamburger>
      </div>
    </header>
  )
}

export default Header
