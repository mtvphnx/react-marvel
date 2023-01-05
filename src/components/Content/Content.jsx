import {Component} from "react";
import styles from './Content.module.scss';
import Server from "../../services/server";
import {Spinner} from "../Spinner/Spinner";
import {Error} from "../Error/Error";
import Info from "../Info/Info";
import cn from 'classnames';

export default class Content extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
        current: null
    }

    API = new Server();

    onCharsLoaded = (chars) => {
        this.setState({chars, loading: false});
    }

    onCharsError = () => {
        this.setState({error: true});
    }

    updateList = () => {
        this.API
            .getAllElements()
                .then(this.onCharsLoaded)
                .catch(this.onCharsError);
    }

    selectHero = (e, id) => {
        this.setState({current: id});
        document.querySelectorAll(`.${styles.active}`).forEach(item => item.classList.remove(`${styles.active}`));
        e.currentTarget.classList.add(`${styles.active}`);
    }

    componentDidMount() {
        this.updateList();
    }

    render() {
        const {chars, loading, error, current} = this.state;
        
        const elementsList = chars.map((item) => {
            return (
                <li key={item.id} className={cn(styles.element, 'element')}
                    onClick={e => this.selectHero(e, item.id)}>
                    <img src={item.thumbnail} alt={item.name}/>
                    <div className={styles.name}>{item.name}</div>
                </li>
            )
        })

        const loadingMessage = loading ? <Spinner/> : null,
            errorMessage = error ? <Error/> : null,
            content = !loading && !error ? elementsList : null;

        return (
            <div className={styles.content}>
                <ul className={styles.list}>
                    {loadingMessage}
                    {errorMessage}
                    {content}
                    <div className={styles.load}>
                        <button className={cn('button', styles.more)}>LOAD MORE</button>
                    </div>
                </ul>
                <div className={styles.current}>
                    <Info id={current}/>
                </div>
            </div>
        )
    }
}