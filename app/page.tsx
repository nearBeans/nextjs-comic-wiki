import Link from 'next/link'
import styles from './_css/Top.module.css'

export default function Home() {
  return (
    <>
      <div className={styles["section-wrapper"]}>
        <section className={styles["main-section"]}>
          <div className={styles["search"]}>
            <input type="text" name="q" placeholder='キーワードを入力' className={styles['search-box']} />
            <button type="submit" className={styles['search-btn']}><svg xmlns="http://www.w3.org/2000/svg" fill='white' width="1.3em" height="1.3em" viewBox="0 0 24 24"><title>search-rounded</title><path fill="currentColor" d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg></button>
          </div>
          <section className={`${styles['recommend']} works-list`}>
            <h2>おすすめ</h2>
            <div className='scroll-x'>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
            </div>
          </section>
          <section className={`${styles['recent']} works-list`}>
            <h2>最近の更新</h2>
            <div className='scroll-x'>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
            </div>
          </section>
          <section className={`${styles['history']} works-list`}>
            <h2>閲覧履歴</h2>
            <div className='scroll-x'>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
              <div className="card">
                <Link href="/"><img src="https://placehold.jp/500x710.png" alt="書影" /></Link>
                <Link href="/"><h3>作品名</h3></Link>
                <Link href="/"><p>著者名</p></Link>
              </div>
            </div>
          </section>
        </section>
        <section className={styles["rankings"]}>
          <h1>ランキング</h1>
        </section>
      </div>
    </>
  )
}