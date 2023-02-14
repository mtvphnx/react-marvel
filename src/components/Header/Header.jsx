import {Link, NavLink} from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
            <Link to={`${process.env.PUBLIC_URL}/`} className={styles.logo}>
                <span>Marvel</span> information portal
            </Link>
            <div className={styles.links}>
                <NavLink end to={`${process.env.PUBLIC_URL}/`} className={({isActive}) => isActive ? styles.active : ''}>Characters</NavLink>
                <span>/</span>
                <NavLink end to={`${process.env.PUBLIC_URL}/comics`} className={({isActive}) => isActive ? styles.active : ''}>Comics</NavLink>
            </div>
        </header>
    )
}