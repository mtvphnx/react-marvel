import {Component} from "react";
import styles from './Content.module.scss';
import Server from "../../services/server";
import {Spinner} from "../Spinner/Spinner";
import {Error} from "../Error/Error";
import Info from "../Info/Info";
import cn from 'classnames';
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

export default class Content extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
        current: null,
        listLoading: false,
        listLength: 210,
        endList: false
    }

    API = new Server();

    onCharsLoaded = (newChars) => {
        if (newChars.length < 9) {
            this.setState({endList: true});
        }

        this.setState(({chars, listLength}) => ({
            chars: [...chars, ...newChars], listLength: listLength + 9, loading: false, listLoading: false
        }));
    }

    onCharsError = () => {
        this.setState({error: true, loading: false});
    }

    onUpdateListLoading = () => {
        this.setState({listLoading: true})
    }

    updateList = () => {
        this.loadList();
    }

    loadList = () => {
        this.onUpdateListLoading();

        this.API
            .getAllElements(this.state.listLength)
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
        const {chars, loading, error, current, listLoading, endList} = this.state;
        
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
                        <button
                            onClick={this.loadList}
                            disabled={listLoading}
                            className={cn('button', styles.more)}
                            style={{'display': endList ? 'none' : 'block'}}>
                            {listLoading ? 'loading...' : 'LOAD MORE'}
                        </button>
                    </div>
                </ul>
                <div className={styles.current}>
                    <ErrorBoundary>
                        <Info id={current}/>
                    </ErrorBoundary>
                </div>
            </div>
        )
    }
}