import {Header} from "../../components";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ComicsPage, ErrorPage, MainPage} from '../Pages/';

export const App = () => {
    return (
        <Router>
            <div className="container">
                <Header/>
                <Routes>
                    <Route path={process.env.PUBLIC_URL} element={<MainPage/>}/>
                    <Route path={process.env.PUBLIC_URL + '/comics'} element={<ComicsPage/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>
            </div>
        </Router>
    )
}