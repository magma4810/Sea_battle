import * as styles from '../styles/Stats.module.css';
import React, { useState, useEffect } from 'react';


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

                <div className={styles.profile}>
                    {/*Пароль я не стал добавлять так как это не безопастно!!! */}
                    {/*<span>{user ? `Password: ${user.password}` : <></>}</span>*/}

                    {/*Аватар игрока*/}
                    <div>
                        <img className={styles.image}
                             src="https://avatars.mds.yandex.net/get-yapic/40138/PNspbnuWIoYTTeBboPewZIG6PU-1574216359/orig"/>
                    </div>

                    {/*Вывод ника игрока из базы данных*/}
                    <div className={styles.nickname}>
                       {user ? user.nickname : 'Гость'}
                    </div>

                    {/*Блок статистики игрока*/}
                    <div className={styles.statistics}>

                        {/*Медали игрока*/}
                        <div className={styles.achievementsTitle}>
                            <div>Достижения:</div>
                            <img className={styles.achievements}
                                 src="https://avatars.mds.yandex.net/i?id=7bb4252c023d2a9c4b61571fac31a31cbc831e0a-8210080-images-thumbs&n=13"/>
                            <img className={styles.achievements}
                                 src="https://avatars.mds.yandex.net/i?id=c66530e1c28d168e71f5f6831275385e21c68e05-5413570-images-thumbs&n=13"/>
                            <img className={styles.achievements}
                                 src="https://avatars.mds.yandex.net/i?id=a5cfa7d2329de764d95872aa6293f4a3e759148d-9149104-images-thumbs&n=13"/>
                            <img className={styles.achievements}
                                 src="https://avatars.mds.yandex.net/i?id=18c4f89034dcc1d3a6d9fdc03ce86755742389cc-4628623-images-thumbs&n=13"/>
                        </div>

                        {/*Сколько кораблей уничтожил игрок*/}
                        <div className={styles.shipsAreReduced}>
                            Уничтожено кораблей: 10
                        </div>

                        {/*всего сыгранно игр*/}
                        <div className={styles.winRaid}>
                            Всего сыгранно игр: 16
                        </div>

                        {/*Сколько раз проиграл игрок*/}
                        <div className={styles.winRaid}>
                            Число поражений: 6
                        </div>

                        {/*Сколько одержал победу игрок*/}
                        <div className={styles.winRaid}>
                            Число побед: 10
                        </div>
                    </div>

                </div>
            </div>}
        </>

    );
}