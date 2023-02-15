import styles from './Hero.module.scss';
import useServer from '../../services/server';
import {useState, useEffect} from "react";
import cn from 'classnames';
import {Spinner, Error, RandomChar, ErrorBoundary} from "../../components";
import bg from '../../resources/mjor.png';

export const Hero = () => {
    const [char, setChar] = useState({});
    const {loading, error, getCharacter, clearError} = useServer();

    const onCharLoaded = char => setChar(char);

    const updateChar = () => {
        clearError();
        getCharacter(Math.floor(Math.random() * (1011400 - 1011000) + 1011000))
            .then(result => onCharLoaded(result));
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