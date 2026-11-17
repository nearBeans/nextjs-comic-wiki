import Link from "next/link"
import styles from './_css/Nav.module.css'

export default function Nav() {
  return (
    <>
      <header className={styles["header"]}>
        <div className={styles["header-top"]}>
          <h1>
            <Link href="/">Comic Wiki</Link>
          </h1>
          <div className={styles["account"]}>
            <Link href="/account"><img src="https://placehold.jp/64x64.png" alt="ユーザーのアイコン" width={64} height={64} /></Link>
          </div>
        </div>
        <div className={styles["header-bottom"]}>
          <nav>
            <ul className={styles["nav-list"]}>
              <li>
                <Link href="/search">マンガを検索</Link>
              </li>
              <li>
                <Link href="/edit">マンガを編集</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}