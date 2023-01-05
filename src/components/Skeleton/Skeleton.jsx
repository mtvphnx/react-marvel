import styles from './Skeleton.module.scss';

export const Skeleton = () => {
    return (
        <>
            <p className={styles.text}>Please select a character to see information</p>

            <div className={styles.top}>
                <div className={styles.pic}/>
                <div className={styles.wrap}>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>
            <div className={styles.body}/>
            <div className={styles.body}/>
            <div className={styles.body}/>
            <div className={styles.body}/>
        </>
    )
}