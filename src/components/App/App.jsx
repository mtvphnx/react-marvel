import {Header} from "../../components";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Comics, Error, Main, SingleComic,} from '../Pages/';

export const App = () => {
    return (
        <Router>
            <div className="container">
                <Header/>
                <Routes>
                    <Route path={`${process.env.PUBLIC_URL}/`} element={<Main/>}/>
                    <Route path={`${process.env.PUBLIC_URL}/comics`} element={<Comics/>}/>
                    <Route path={`${process.env.PUBLIC_URL}/comics/:comicId`} element={<SingleComic/>}/>
                    <Route path={process.env.PUBLIC_URL + '/*'} element={<Error/>}/>
                </Routes>
            </div>
        </Router>
    )
}