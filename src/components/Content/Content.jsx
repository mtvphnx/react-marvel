import {Component} from "react";
import styles from './Content.module.scss';
import {CharInfo, CharList, ErrorBoundary} from '../../components';

export class Content extends Component {
    state = {
        current: null
    }

    itemsRefs = [];

    setRef = (ref) => {
        this.itemsRefs.push(ref);
    }

    selectHero = (id, index) => {
        this.setState({current: id});

        this.itemsRefs.forEach(item => item.classList.remove(`${styles.active}`));
        this.itemsRefs[index].classList.add(`${styles.active}`);
        this.itemsRefs[index].focus();
    }

    render() {
        const {current} = this.state;

        return (
            <div className={styles.content}>
                <ErrorBoundary>
                    <CharList setRef={this.setRef} handler={this.selectHero}/>
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