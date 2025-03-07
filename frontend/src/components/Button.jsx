import * as styles from "../styles/SeaBattle.module.css";

export function Button({title,onClick}){
    return (
        <>
         <button className={styles.button} onClick={onClick}>{title}</button>
         </>
    )
}