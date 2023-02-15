import styles from './Banner.module.scss';
import leftPic from '../../resources/left-banner.png';
import rightPic from '../../resources/right-banner.png';

export const Banner = () => {
    return (
        <div className={styles.banner}>
            <div className={styles.left}>
                <img src={leftPic} alt="Avengers"/>
                <div className={styles.text}>New comics every week!<br/>Stay tuned!</div>
            </div>
            <div className={styles.right}>
                <img src={rightPic} alt="Avengers"/>
            </div>
        </div>
    )
}