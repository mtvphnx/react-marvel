import styles from './Hero.module.scss';
import Server from '../../services/server';
import {Component} from "react";
import cn from 'classnames';
import {Spinner} from "../Spinner/Spinner";
import {Error} from "../Error/Error";
import bg from '../../resources/mjor.png';
import {RandomChar} from "../RandomChar/RandomChar";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

export class Hero extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    }

    API = new Server();

    onCharLoaded = (char) => {
        this.setState({char, loading: false});
    }

    onErrorLoader = () => {
        this.setState({loading: false, error: true});
    }

    updateChar = () => {
        this.setState({loading: true, error: false});

        this.API
            .getElement(Math.floor(Math.random() * (1011400 - 1011000) + 1011000))
            .then(result => this.onCharLoaded(result))
            .catch(this.onErrorLoader);
    }

    componentDidMount() {
        this.updateChar();
    }

    render() {
        const {char, loading, error} = this.state;

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
                        <button onClick={this.updateChar} disabled={loading} className={cn('button', styles.button)}>TRY IT</button>
                        <div className={styles.bg}>
                            <img src={bg} alt="Mjolner"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}