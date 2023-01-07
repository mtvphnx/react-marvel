import {Component} from "react";
import styles from "../Content/Content.module.scss";
import cn from "classnames";
import {Spinner, Error} from "../../components";
import Server from "../../services/server";
import PropTypes from "prop-types";

export class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
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

    componentDidMount() {
        this.updateList();
    }

    render() {
        const {chars, loading, error, listLoading, endList} = this.state;
        const {handler} = this.props;

        const elementsList = chars.map((item) => {
            return (
                <li key={item.id} className={cn(styles.element, 'element')}
                    onClick={e => handler(e, item.id)}>
                    <img src={item.thumbnail} alt={item.name}/>
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
                        onClick={this.loadList}
                        disabled={listLoading}
                        className={cn('button', styles.more)}
                        style={{'display': endList ? 'none' : 'block'}}>
                        {listLoading ? 'loading...' : 'LOAD MORE'}
                    </button>
                </div>
            </ul>
        )
    }
}

CharList.propTypes = {
    handler: PropTypes.func
}