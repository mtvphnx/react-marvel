import styles from './Hero.module.scss';
import Server from '../../services/server';
import {useState, useEffect} from "react";
import cn from 'classnames';
import {Spinner, Error, RandomChar, ErrorBoundary} from "../../components";
import bg from '../../resources/mjor.png';

export const Hero = () => {
    const [char, setChar] = useState({}),
        [loading, setLoading] = useState(true),
        [error, setError] = useState(false);

    const API = new Server();

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onErrorLoader = () => {
        setLoading(false);
        setError(true);
    }

    const updateChar = () => {
        setLoading(true);
        setError(false);

        API
            .getElement(Math.floor(Math.random() * (1011400 - 1011000) + 1011000))
            .then(result => onCharLoaded(result))
            .catch(onErrorLoader);
    }

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, []);

    return (
        <div className={styles.random}>
            <div className={styles.item}>
                {loading ? <Spinner/> : error ? <Error/> : <ErrorBoundary><RandomChar char={char}/></ErrorBoundary>}
            </div>
            <div className={styles.item}>
                <div className={styles.wrapper}>
                    <div className={styles.title}>Random character for today!
                        Do you want to get to know him better?</div>
                    <div className={styles.subtitle}>Or choose another one</div>
                    <button onClick={updateChar} disabled={loading} className={cn('button', styles.button)}>TRY IT</button>
                    <div className={styles.bg}>
                        <img src={bg} alt="Mjolner"/>
                    </div>
                </div>
            </div>
        </div>
    )
}