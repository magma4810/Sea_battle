import { useLocation } from 'react-router-dom';
import GameIcon from '../img/Game.png';
import ProfileIcon from '../img/Profile.png';
import BestPlayersIcon from '../img/BestPlayers.png';
import * as styles from '../styles/Sidebar.module.css';
import { Logout } from './Logout';
import { LoginButton } from './LoginButton';
import { useState,useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Sidebar(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const authenticated = Cookies.get('authenticated');
        setIsAuthenticated(authenticated === 'true');
        setLoading(false);
    }, []);
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
            {loading ? <></> : isAuthenticated ? <Logout/> : <LoginButton/>}
        </div>
    )
}