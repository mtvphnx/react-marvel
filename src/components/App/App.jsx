import {Header, Random} from "../../components";
import Content from "../Content/Content";

export const App = () => {
    return (
        <div className="container">
            <Header/>
            <Random/>
            <Content/>
        </div>
    )
}