import {Component} from "react";
import {Error} from "../Error/Error";
import styles from './ErrorBoundary.module.scss';

export default class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({error: true})
    }

    render() {
        if (this.state.error) {
            return (
                <>
                    <h2 className={styles.text}>Something went wrong</h2>
                    <Error/>
                </>
            )
        }

        return this.props.children;
    }
}