import * as styles from '../styles/Authenticatedpls.module.css';

export function Authenticatedpls(){//поменять название классов
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
                <div className={styles.main}>
                    <div className={`${styles.authorizationButton} ${styles.size}`}>
                        <a className={styles.signinButton} href = "/signin">Авторизоваться</a>
                    </div>
                </div>
            </div>
        </div>
    );
}