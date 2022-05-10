import {Component} from "react";
import {Spinner} from "../Spinner/Spinner";
import {Error} from "../Error/Error"
import Server from "../../services/server";

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        loading: true,
        error: false,
        hero: {}
    }

    componentDidMount() {
        this.loadHero();
    }

    createHero = hero => {
        this.setState({hero, loading: false})
    };

    createError = () => {
        this.setState({loading: false, error: true})
    };

    loadHero = () => {
        const server = new Server();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        server
            .getHero(id)
            .then(this.createHero)
            .catch(this.createError);
    }

    render() {
        const {hero, loading, error} = this.state;

        const loadingMessage = loading ? <Spinner/> : null,
            errorMessage = error ? <Error/> : null,
            content = !(loading || error) ? <View hero={hero}/> : null;

        return (
            <div className="randomchar">
                {loadingMessage}
                {errorMessage}
                {content}

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={this.loadHero}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({hero}) => {
    const {name, description, thumbnail, homepage, wiki} = hero;

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{(description !== '') ? description : 'Description not found'}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;