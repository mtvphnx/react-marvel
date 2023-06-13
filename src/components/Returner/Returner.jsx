import styles from "./Returner.module.scss";
import {Link} from "react-router-dom";

export const Returner = ({prev = 'main'}) => {
  return (
      <div className={styles.wrapper}>
          <div className={styles.text}>
              <span className={styles.span}>Page not found 😔</span>
              <span className={styles.span}>Return to <Link className={styles.link} to={`/${prev !== 'main' ? prev : ''}`}>{prev}</Link></span>
          </div>
      </div>
  )
}