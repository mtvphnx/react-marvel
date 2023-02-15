import styles from './SingleComic.module.scss';
import {Banner, Spinner, Returner, Error} from "../../../components";
import {Link, useParams} from 'react-router-dom';
import useServer from "../../../services/server";
import {useEffect, useState} from "react";

export const SingleComic = () => {
    const [comic, setComic] = useState({});
    const {loading, error, getComic, clearError} = useServer();

    const {comicId} = useParams();

    const onComicLoaded = comic => setComic(comic);

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(result => onComicLoaded(result));
    }

    useEffect(() => {
        updateComic();
        // eslint-disable-next-line
    }, [comicId]);

    return (
        <>
            <Banner/>
            {loading ? <Spinner/> : null}
            {error ? <><Returner prev="comics"/><Error/></> : null}
            {!loading && !error && comic ? <View comic={comic}/> : null}
        </>
    )
}

const View = ({comic}) => {
    const {thumbnail, title, description, language, price, pageCount} = comic;

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <img src={thumbnail} alt={title}/>
            </div>
            <div className={styles.right}>
                <div className={styles.title}>{title}</div>
                <div className={styles.flex}>
                    <div className={styles.desc}>{description}</div>
                </div>
                <div className={styles.counter}>{pageCount}</div>
                <div className={styles.lang}>Language: {language}</div>
                <div className={styles.price}>{price}</div>
            </div>
            <Link to={`${process.env.PUBLIC_URL}/comics`} className={styles.breadcrumb}>Back to all</Link>
        </div>
    )
}