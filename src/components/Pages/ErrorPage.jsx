import {Error} from "../Error/Error";
import {Link} from 'react-router-dom'
import styles from './Page.module.scss';

export const ErrorPage = () => {
  return (
      <div className={styles.wrapper}>
        <div className={styles.text}>
            <span className={styles.span}>Page not found 😔</span>
            <span className={styles.span}>Return to <Link className={styles.link} to={process.env.PUBLIC_URL}>Main</Link></span>
        </div>
        <Error/>
      </div>
  )
}