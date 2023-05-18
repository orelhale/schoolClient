import './App.css';
import MyApp from './components/MyApp';
import Layout from './layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import ContainerDataContext from './context/ContainerDataContext';


function App() {

    return (
        <ContainerDataContext>

            <div className="App">
                <BrowserRouter>
                    {/* <MyApp /> */}
                    <Layout />
                </BrowserRouter>
            </div>
        </ContainerDataContext>
    );
}

export default App;
