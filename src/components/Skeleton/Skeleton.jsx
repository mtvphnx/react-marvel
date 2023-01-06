import styles from './Skeleton.module.scss';

export const Skeleton = () => {
    const generateRow = number => {
        const arr = [];
        for (let x = 0; x < number; x++) arr.push(x);
        return arr;
    }

    const generateList = arr => {
        return arr.map(item => <div key={item} className={styles.body}/>)
    }

    return (
        <>
            <p className={styles.text}>Please select a character to see information</p>
            <div className={styles.top}>
                <div className={styles.pic}/>
                <div className={styles.wrap}>
                    {generateList(generateRow(5))}
                </div>
            </div>
            {generateList(generateRow(5))}
        </>
    )
}