import styles from './Header.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
            <a href={`${process.env.PUBLIC_URL}`} className={styles.logo}>
                <span>Marvel</span> information portal
            </a>
            <div className={styles.links}>
                <a href="/" className={styles.active}>Characters</a>
                <span>/</span>
                <a href="/">Comics</a>
            </div>
        </header>
    )
}