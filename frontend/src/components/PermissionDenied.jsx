import * as styles from '../styles/PermissionDenied.module.css';

export function PermissionDenied({context}){
    return (
        <div className={styles.permissionDeniedContainer}>
            <span className={styles.permissionDenied}>Для просмотра {context}</span>
            <span className={styles.permissionDenied}>пройдите авторизацию</span>
            <img src="../img/permissionDenied.png" alt="" />
        </div>
    )
}