import * as styles from '../styles/Signup.module.css';
import { useState } from 'react';

export default function Signup() {
    const [data, setData] = useState({
        username: '',
        password: '',
        repeatPassword: ''
    });

    const handleInputChange = (field, value) => {
        setData({
            ...data,
            [field]: value
        });
    };
    return (
        <div className={styles.bodySignup}>
            <div className={styles.signupContainer}>
                <div className={styles.signupContainerHeader}>
                    <img src="img/Signin.png" alt="" className={styles.imgSignup} />
                    <h1>Добро пожаловать!</h1>
                </div>
                <div className={styles.main}>
                    <Input tag="Username" onChange={(e) => handleInputChange('username', e.target.value)} />
                    <Input tag="Password" onChange={(e) => handleInputChange('password', e.target.value)} />
                    <Input tag="Repeat Password" onChange={(e) => handleInputChange('repeatPassword', e.target.value)} />
                    <div className={`${styles.authorizationButton} ${styles.size}`}>
                        <button className={styles.signupButton} onClick={() => signup(data)}>Зарегистрироваться</button>
                    </div>
                </div>
                <div>
                    <p><a href="/signin">У вас уже есть аккаунт?</a></p>
                </div>
            </div>
        </div>
    );
}

export function Input(props) {
    return (
        <div className={styles.inputEnter}>
            <p>{props.tag} *</p>
            <input
                className={styles.size}
                type="text"
                placeholder={`Enter your ${props.tag}`}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}

async function signup(data) {
    try {
        if (data.username !== '' && data.password !== '' && data.repeatPassword !== '') {
            if (data.password  === data.repeatPassword) {
                    const newUser = {
                        username: data.username,
                        login: data.username,
                        password: data.password
                    }
                    const response = await fetch(`/api/createNewUser`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify(newUser)
                    });
                    if (response.ok) {
                        window.location.href = `/signin`;
                    } else {
                        const errorData = await response.json();
                        alert(`Ошибка регистрации: ${errorData.message || 'Неизвестная ошибка'}`);
                    }
            } else {
                alert('Пароли должны совпадать!!!');
            }
        } else {
            alert('Поля должна быть заполнены!!!');
        }
    }catch (err) {
        alert(err, "Некорректные данные");
        console.error('Произошла ошибка:', err);
    }
}