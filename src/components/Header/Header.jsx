import {Link, NavLink} from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
            <Link to={`/`} className={styles.logo}>
                <span>Marvel</span> information portal
            </Link>
            <div className={styles.links}>
                <NavLink end to={`/`} className={({isActive}) => isActive ? styles.active : ''}>Characters</NavLink>
                <span>/</span>
                <NavLink to={`/comics`} className={({isActive}) => isActive ? styles.active : ''}>Comics</NavLink>
            </div>
        </header>
    )
}