import * as styles from '../styles/Authenticatedpls.module.css';
import Cookies from 'js-cookie';

export function Authenticatedpls({ isOpen, onClose }){//поменять название классов
    Cookies.set('guest', 'true', 1);
    if (!isOpen) return null;
    return (
        <div className={styles.bodySignin}>
            <div className={styles.signinContainer}>
                <div className={styles.signinContainerHeader}>
                    <img src="img/Signin.png" alt="" className={styles.imgSignin} />
                    <h1>Добро пожаловать!</h1>
                </div>
                <div className={styles.signinContainerHeader}>
                    <h1>Для начала пройдите авторизацию!</h1>
                </div>
                <div className={styles.signinContainerHeader}>
                    <a onClick={onClose} className={styles.guest}>Или продолжите как Гость</a>
                </div>
                <div className={styles.main}>
                    <div className={`${styles.authorizationButton} ${styles.size}`}>
                        <a className={styles.signinButton} href = "/signin">Авторизоваться</a>
                    </div>
                </div>
            </div>
        </div>
    );
}