import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Catalog from './components/Catalog/Catalog';
import ProductDetails from './components/Catalog/ProductDetails';
import Header from './components/Header/Header';
import About from './components/Pages/About';
import { Welcome } from './components/Pages/Welcome';

import './App.css';

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <Welcome />
                    </Route>
                    <Route path="/about" exact>
                        <About />
                    </Route>
                    <Route path="/shop" exact>
                        <Catalog />
                    </Route>
                    <Route path="/shop/:id" exact component={ProductDetails}>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}
