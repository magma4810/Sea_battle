import * as styles from '../styles/Signin.module.css';
import { useState } from 'react';
import { Input } from './Signup';

export default function Signin() {
    const [data, setData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (field, value) => {
        setData({
            ...data,
            [field]: value
        });
    };
    return (
        <div className={styles.bodySignin}>
            <div className={styles.signinContainer}>
                <div className={styles.signinContainerHeader}>
                    <img src="img/Signin.png" alt="" className={styles.imgSignin} />
                    <h1>Добро пожаловать!</h1>
                </div>
                <div className={styles.main}>
                    <Input tag="Username" onChange={(e) => handleInputChange('username', e.target.value)} />
                    <Input tag="Password" onChange={(e) => handleInputChange('password', e.target.value)} />
                    <div className={`${styles.authorizationButton} ${styles.size}`}>
                        <button className={styles.signinButton} onClick={() => signinClick(data)}>Авторизоваться</button>
                    </div>
                </div>
                <div>
                    <p><a href="/signup">У вас нет аккаунта?</a></p>
                </div>
            </div>
        </div>
    );
}

async function signinClick(data) {
    console.log(data)
    try {
        if (data.username !== '' && data.password !== '') {
            const passwordArray = await fetch(`/api/getUserPassword/${data.username}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            })
                .then(res => res.json())
                .then(password => password[0]);
            if (passwordArray) {
                const password = passwordArray.password;
                if (password === data.password) {
                    const userData = {
                        username: data.username,
                        password: data.password,
                    }
                    await fetch(`/api/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify(userData),
                        credentials: 'include'
                    })
                    window.location.href = `/`;
                } else {
                    alert('Неверный пароль');
                }
            } else {
                alert('Неверный логин или пароль');
            }
        } else {
            alert('Поля должна быть заполнены!!!');
        }
} catch (err) {
    alert(err, "Некорректные данные");
    console.error('Произошла ошибка:', err);
}
}