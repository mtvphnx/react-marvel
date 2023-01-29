import {useState, useEffect} from "react";
import styles from "../Content/Content.module.scss";
import cn from "classnames";
import {Spinner, Error} from "../../components";
import Server from "../../services/server";
import PropTypes from "prop-types";

export const CharList = (props) => {
    const [chars, setChars] = useState([]),
        [loading, setLoading] = useState(true),
        [error, setError] = useState(false),
        [listLoading, setListLoading] = useState(false),
        [listLength, setListLength] = useState(210),
        [endList, setEndList] = useState(false);

    const API = new Server();

    const onCharsLoaded = (newChars) => {
        if (newChars.length < 9) {
            setEndList(true);
        }

        setChars(chars => [...chars, ...newChars]);
        setListLength(listLength => listLength + 9);
        setLoading(false);
        setListLoading(false);
    }

    const onCharsError = () => {
        setError(true);
        setLoading(false);
    }

    const onUpdateListLoading = () => {
        setListLoading(true);
    }

    const updateList = () => {
        loadList();
    }

    const loadList = () => {
        onUpdateListLoading();

        API
            .getAllElements(listLength)
            .then(onCharsLoaded)
            .catch(onCharsError);
    }

    useEffect(() => {
        updateList();
        // eslint-disable-next-line
    }, []);

    const {handler} = props;

    const elementsList = chars.map((item, index) => {
        return (
            <li key={item.id} className={styles.element}
                ref={e => props.setRef(e, index)}
                tabIndex={0}
                onClick={() => handler(item.id, index)}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        handler(item.id, index);
                    }
                }}>
                <img src={item.thumbnail} alt={item.name}
                     style={{'objectPosition': item.fit ? `top ${item.fit}` : 'top center'}}/>
                <div className={styles.name}>{item.name}</div>
            </li>
        )
    })

    const loadingMessage = loading ? <Spinner/> : null,
        errorMessage = error ? <Error/> : null,
        content = !loading && !error ? elementsList : null;

    return (
        <ul className={styles.list}>
            {loadingMessage}
            {errorMessage}
            {content}
            <div className={styles.load}>
                <button
                    onClick={loadList}
                    disabled={listLoading}
                    className={cn('button', styles.more)}
                    style={{'display': endList ? 'none' : 'block'}}>
                    {listLoading ? 'loading...' : 'LOAD MORE'}
                </button>
            </div>
        </ul>
    )
}

CharList.propTypes = {
    handler: PropTypes.func,
    setRef: PropTypes.func
}