import { useState } from 'react'
import styles from '../styles/MenuHamburger.module.scss'

function MenuHamburger({ children }: any) {
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }

  const handleLinksVisibility = () => {
    return checked
      ? styles.menuHamburger__links + ' ' + styles.menuHamburger__displayLinks
      : styles.menuHamburger__links
  }

  return (
    <div className={styles.menuHamburger}>
      <label htmlFor="check" className={styles.menuHamburger__label}>
        <input
          type="checkbox"
          id="check"
          className={styles.menuHamburger__toggle}
          checked={checked}
          onChange={handleChange}
        />
        <span className={styles.menuHamburger__line}></span>
        <span className={styles.menuHamburger__line}></span>
        <span className={styles.menuHamburger__line}></span>
      </label>
      <div className={handleLinksVisibility()}>{children}</div>
    </div>
  )
}

export default MenuHamburger
