import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store/store';
import Login from "./pages/Login";
import Registro from "./pages/Regsitro";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

export default function App(){
    return(
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/index.html" element={<Login />}/>
                    <Route path="/registro" element={<Registro />}/>
                    <Route path="/dashboard" element={<Dashboard />}/>
                    <Route path="*" element={<NotFound />}/>
                </Routes>       
            </Router>
        </Provider>
    )
}