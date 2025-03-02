import * as styles from "../styles/Sidebar.module.css"
import LogoutIcon from '../img/Logout.png';

export function Logout(){
    return (
        <a onClick={logout} href="/signin" className={styles.icons}><img src={LogoutIcon} alt="Logout" />Logout</a>
    )
}

async function logout(){
    await fetch('/api/logout', { method: 'POST' });
}