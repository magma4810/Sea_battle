import * as styles from '../styles/Stats.module.css';
import { useState, useEffect } from 'react';

export function Stats() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/check-session')
            .then((response) => response.json())
            .then((data) => {
                if (data.authenticated) {
                    setUser(data.user);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error('Error fetching session:', error);
            });
    }, []);

    return (
        <>
            {loading ? <></> : <div className={styles.statsContainer}>
                <h1 className='headerStats'>Your Profile:</h1>
                <span>Nickname: {user ? user.username : 'Гость'}</span>
                <span>{user ? `Password: ${user.username}` : <></>}</span>

            </div>}
        </>

    );
}