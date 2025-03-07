import * as styles from '../styles/BestPlayers.module.css';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function BestPlayers() {
    const [users, setUsers] = useState([]);
    const [nickname, setNickname] = useState("");
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState("");

    useEffect(() => {
        const nickname = Cookies.get('nickname');
        fetch(`/api/getStatUsers`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
                setNickname(nickname);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setLoading(false);
                setNickname(nickname);
            });
    }, []);
    const filteredUsers = users.filter((user) =>
        user.nickname.toLowerCase().includes(input.toLowerCase())
    );
    return (
        <div className={styles.bestPlayersContainer}>
            <span className={styles.spanBestPlayers}>Best Players:</span>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", height: "70%" }}>
                <input onChange={(e => setInput(e.target.value))} value={input} type="text" className={styles.bestPlayersInput} placeholder='Enter nickname' />
                {loading ? <span>Loading.....</span> :
                    (input == "" ? <ol style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                        {users.filter(user => user.games > 10)
                            .map((user, index) => (
                                <CardPlayer key={index} user={user} nickname={nickname} index={index} />
                            ))}
                    </ol> : <ol style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <CardPlayer key={index} user={user} nickname={nickname} index={index} />
                            ))
                        ) : (
                            <span className={styles.spanNotFound}>
                                Совпадения не найдены :(
                            </span>
                        )}
                    </ol>)
                }
            </div>
        </div>
    )
}


function CardPlayer({ user, index, nickname }) {
    index += 1;
    return (
        <li className={styles.itemList}>
            <span className={styles.spanBestPlayers}>{user.games < 11 ? "-" : index}</span>
            <div className={nickname === user.nickname ? `${styles.cardPlayer}   ${styles.active}` : styles.cardPlayer}>
                <span>Nickname: {user.nickname}</span>
                <span>Winrate: {user.winrate}%</span>
                <span>Games: {user.games}</span>
            </div>
        </li>
    )
}