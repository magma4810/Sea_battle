import { useLocation } from 'react-router-dom';
import GameIcon from '../img/Game.png';
import ProfileIcon from '../img/Profile.png';
import BestPlayersIcon from '../img/BestPlayers.png';
import * as styles from '../styles/Sidebar.module.css';
import { Logout } from './Logout';

export default function Sidebar(){
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path;
    };
    return (
        <div className={styles.sidebar}>
            <div className={styles.gameInfo}>
            <a
                    href="/"
                    className={`${styles.icons} ${isActive('/') ? styles.active : ''}`}
                >
                    <img src={GameIcon} alt="Game" />Game
                </a>
                <a
                    href="/myStats"
                    className={`${styles.icons} ${isActive('/myStats') ? styles.active : ''}`}
                >
                    <img src={ProfileIcon} alt="Profile" />Stats
                </a>
                <a
                    href="/bestPlayers"
                    className={`${styles.icons} ${isActive('/bestPlayers') ? styles.active : ''}`}
                >
                    <img src={BestPlayersIcon} alt="Best Players" />Best players
                </a>
            </div>
            <Logout/>
        </div>
    )
}