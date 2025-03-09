import * as styles from '../styles/Notfound.module.css'

export default function Notfound(){
    return (
    <div className={styles.notfound}>
        <div className={styles.notfoundContainer}>
            <strong><span className={styles.error}>404</span></strong>
            <h1>Oooops!</h1>
            <div className={styles.sorry}><span>We are sorry,</span><span>The page you are looking for doesn`t exist.</span></div>
            <a href="/" className={styles.goto}>Go to Main Page</a>
        </div>
    </div>
    )
}