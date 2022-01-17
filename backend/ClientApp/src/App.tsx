import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Cart from './components/Cart';
import Catalog from './components/Catalog';
import ProductDetails from './components/Catalog/ProductDetails';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './components/Pages/About';
import Welcome from './components/Pages/Welcome';

import './App.css';
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
    return (
        <div className="App">
            <ToastContainer position='bottom-right' hideProgressBar />
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
                    <Route path="/cart" exact>
                        <Cart />
                    </Route>
                    <Route path="/shop/:id" exact component={ProductDetails} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </div>
    );
}
