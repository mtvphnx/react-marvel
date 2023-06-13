import {Header, Spinner} from "../../components";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {lazy, Suspense} from 'react';
import Main from "../Pages/Main/Main";

const Comics = lazy(() => import('../Pages/Comics/Comics'));
const SingleComic = lazy(() => import('../Pages/SingleComic/SingleComic'));
const Error = lazy(() => import('../Pages/Error/Error'));


export const App = () => {
    return (
        <Router>
            <div className="container">
                <Header/>
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path={`/`} element={<Main/>}/>
                        <Route path={`comics`} element={<Comics/>}/>
                        <Route path={`comics/:comicId`} element={<SingleComic/>}/>
                        <Route path={`*`} element={<Error/>}/>
                    </Routes>
                </Suspense>
            </div>
        </Router>
    )
}