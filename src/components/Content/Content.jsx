import {useRef, useState} from "react";
import styles from './Content.module.scss';
import {CharInfo, CharList, ErrorBoundary} from '../../components';

export const Content = () => {
    const [current, setCurrent] = useState(null);

    const itemsRefs = useRef([]);

    const generateRefs = (item, index) => {
        itemsRefs.current[index] = item;
    }

    const selectHero = (id, index) => {
        setCurrent(id);

        itemsRefs.current.forEach(item => item.classList.remove(`${styles.active}`));
        itemsRefs.current[index].classList.add(`${styles.active}`);
        itemsRefs.current[index].focus();
    }

    return (
        <div className={styles.content}>
            <ErrorBoundary>
                <CharList setRef={generateRefs} handler={selectHero}/>
            </ErrorBoundary>

            <div className={styles.current}>
                <ErrorBoundary>
                    <CharInfo id={current}/>
                </ErrorBoundary>
            </div>
        </div>
    )
}