import * as styles from "../styles/Sidebar.module.css"
import LoginButtonImg from '../img/LoginButton.png';

export function LoginButton(){
    return (
        <a href="/signin" className={styles.icons}><img src={LoginButtonImg} alt="LoginButton" />Log in</a>
    )
}
