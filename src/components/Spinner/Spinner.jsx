import styles from './Spinner.module.scss';
import icon from '../../resources/spinner.svg';

export const Spinner = () => {
    return (
        <div className={styles.spinner}>
            <img src={icon} alt="Loading"/>
        </div>
    )
}