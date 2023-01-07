import {Component} from "react";
import styles from './Content.module.scss';
import CharInfo from "../CharInfo/CharInfo";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import {CharList} from "../CharList/CharList";

export default class Content extends Component {
    state = {
        current: null
    }

    selectHero = (e, id) => {
        this.setState({current: id});
        document.querySelectorAll(`.${styles.active}`).forEach(item => item.classList.remove(`${styles.active}`));
        e.currentTarget.classList.add(`${styles.active}`);
    }

    render() {
        const {current} = this.state;

        return (
            <div className={styles.content}>
                <ErrorBoundary>
                    <CharList handler={this.selectHero}/>
                </ErrorBoundary>

                <div className={styles.current}>
                    <ErrorBoundary>
                        <CharInfo id={current}/>
                    </ErrorBoundary>
                </div>
            </div>
        )
    }
}