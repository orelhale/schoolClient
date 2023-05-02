import './App.css';
import MyApp from './components/MyApp';
import { createContext, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';

export const UserContext = createContext()

function App() {
    let [ state_of_dataOfUser , setState_of_DataOfUser ] = useState(null)

    console.log("REACT_APP_UrlServer = ", process.env.REACT_APP_U);
    return (
        <UserContext.Provider value={{dataOfUser: state_of_dataOfUser, set:setState_of_DataOfUser}} >
            <div className="App">
                <BrowserRouter>
                    <MyApp />
                </BrowserRouter>
            </div>
        </UserContext.Provider>
    );
}

export default App;
