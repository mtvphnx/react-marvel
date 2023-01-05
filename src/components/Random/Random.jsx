import styles from './Random.module.scss';
import Server from '../../services/server';
import {Component} from "react";
import cn from 'classnames';
import {Spinner} from "../Spinner/Spinner";
import {Error} from "../Error/Error";
import bg from '../../resources/mjor.png';

export class Random extends Component {
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
                    {loading ? <Spinner/> : error ? <Error/> : <View char={char}/>}
                </div>
                <div className={styles.item}>
                    <div className={styles.wrapper}>
                        <div className={styles.title}>Random character for today!
                            Do you want to get to know him better?</div>
                        <div className={styles.subtitle}>Or choose another one</div>
                        <button onClick={this.updateChar} className={cn('button', styles.button)}>TRY IT</button>
                        <div className={styles.bg}>
                            <img src={bg} alt="Mjolner"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;

    return (
        <div className={styles.hero}>
            <div className={styles.thumbnail}>
                <img src={thumbnail} alt={name}/>
            </div>
            <div className={styles.info}>
                <div className={styles.name}>{name}</div>
                <div className={styles.description}>{description ? description : 'Description not found'}</div>
                <div className={styles.func}>
                    <a href={homepage} className={cn('button', styles.link)} target="_blank" rel="noreferrer">Homepage</a>
                    <a href={wiki} className={cn('button', styles.link)} target="_blank" rel="noreferrer">Wiki</a>
                </div>
            </div>
        </div>
    )
}