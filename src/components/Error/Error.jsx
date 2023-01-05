import styles from './Error.module.scss';
import icon from '../../resources/error.png';

export const Error = () => {
    return (
        <div className={styles.error}>
            <img src={icon} alt="Error"/>
        </div>
    )
}