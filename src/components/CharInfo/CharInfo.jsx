import {useState, useEffect} from "react";
import styles from './CharInfo.module.scss';
import useServer from "../../services/server";
import cn from "classnames";
import {Spinner, Error, Skeleton} from "../../components";
import PropTypes from 'prop-types';

export const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {loading, error, getElement, clearError} = useServer();

    const onCharLoaded = (char) => setChar(char);

    const updateChar = () => {
        const {id} = props;
        if (!id) return;

        clearError();
        getElement(id)
            .then(result => onCharLoaded(result));
    }

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, [props.id])

    return (
        <div className={styles.wrapper}>
            {char || loading || error ? null : <Skeleton/>}
            {loading ? <Spinner/> : null}
            {error ? <Error/> : null}
            {!loading && !error && char ? <View char={char}/> : null}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics, fit} = char;

    // eslint-disable-next-line
    const comicsList = comics.map((item, index) => {
        if (index < 10) {
            return (
                <li key={index} className={styles.item}>
                    <a href={item.resourceURI} target="_blank" rel="noreferrer">{item.name}</a>
                </li>
            )
        }
    });

    return (
        <>
            <div className={styles.top}>
                <div className={styles.pic}>
                    <img src={thumbnail} alt={name}
                         style={{'objectPosition': fit ? `top ${fit}` : 'top center'}}/>
                </div>
                <div className={styles.wrap}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.func}>
                        <a href={homepage} target="_blank" rel="noreferrer" className={cn('button', styles.button)}>Homepage</a>
                        <a href={wiki} target="_blank" rel="noreferrer" className={cn('button', styles.button)}>Wiki</a>
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.description}>{description ? description : 'Description not found'}</div>
                <div className={styles.subtitle}>Comics:</div>
                <ul className={styles.list}>
                    {comics.length > 0 ? comicsList : <div className={styles.description}>There is no comics with this character</div>}
                </ul>
            </div>
        </>
    )
}

CharInfo.propTypes = {
    id: PropTypes.number || PropTypes.any
}