import * as styles from '../styles/Stats.module.css';
import { useState, useEffect } from 'react';

export function Stats() {
    const [nickname, setNickname] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/check-session')
            .then((response) => response.json())
            .then((data) => {
                if (data.authenticated) {
                    setNickname(data.user.nickname);
                    fetch(`/api/getStatUserByNickname/${data.user.nickname}`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                        },
                    })
                        .then(response => response.json())
                        .then(data => {
                            setUser(data[0]);
                            setLoading(false);
                        })
                        .catch(error => {
                            console.error('Error fetching users:', error);
                            setUser(data[0]);
                            setLoading(false);
                        });
                }
            })
            .catch((error) => {
                console.error('Error fetching session:', error);
            });
    }, []);
    return (
        <>
            {loading ? <></> : <div className={styles.statsBody}>
            <div className={styles.statsContainer}>
                <img src="img/Signin.png" alt="" className={styles.imgProfile}/>
                <h2 style={{marginTop: "7vw"}}>Nickname: {nickname}</h2>
                <div className={styles.gameStats}>
                    <h3><span>Ships destroyed: {user.shipsDestroyed}</span></h3>
                    <ul>
                        <ShipsLi number={4} value={user.fourDeck}/>
                        <ShipsLi number={3} value={user.threeDeck}/>
                        <ShipsLi number={2} value={user.doubleDecker}/>
                        <ShipsLi number={1} value={user.singleDeck}/>
                    </ul>
                </div>
                        <h3><span>Games played: {user.games}</span></h3>
                    <div className={styles.stat}>
                        <span>Win rate: {user.winrate}%</span>
                        <span>Wins: {user.wins}</span><br />
                        <span>Draw: {user.draw}</span>
                        <span>Defeat: {user.defeat}</span>
                    </div>
                </div>
            </div>}
        </>

    );
}

function ShipsLi({number,value}){
    return (
        <>
            <li >{<img src={`img/${number}.png`} alt="" style={{width: `${number*3}vw`,height: "3vw",paddingRight: "2vw"}}/>} cage:{value}</li>
        </>
    )
}