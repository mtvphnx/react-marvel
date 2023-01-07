import {Component} from "react";
import styles from './Content.module.scss';
import {CharInfo, CharList, ErrorBoundary} from '../../components';

export class Content extends Component {
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