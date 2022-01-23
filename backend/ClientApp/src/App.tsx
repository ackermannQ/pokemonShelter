import { AxiosRequestConfig } from 'axios';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { manageError } from './api/errorManager';
import Basket from './components/Basket';
import { setBasket } from './components/Basket/basketSlice';
import { getBasket } from './components/Basket/httpRepository';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './components/Pages/About';
import Catalog from './components/Pages/Catalog';
import ProductDetails from './components/Pages/Catalog/ProductDetails';
import Checkout from './components/Pages/Checkout';
import Welcome from './components/Pages/Welcome';
import CircularProgressWrapper from './components/Wrapper/CircularProgressWrapper';
import getCookie from './miscellanous/getCookie';
import { useAppDispatch } from './store/configureStore';

import './App.css';
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const buyerId = getCookie("buyerId");

        if (buyerId) {
            getBasket()
                .then((basket: AxiosRequestConfig) => dispatch(setBasket(basket.data)))
                .catch(manageError)
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }

    }, [dispatch]);

    return (
        <div className="App">
            <CircularProgressWrapper isLoading={isLoading}>
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
                        <Route path="/basket" exact>
                            <Basket />
                        </Route>
                        <Route path="/shop/:id" exact component={ProductDetails} />
                        <Route path="/checkout" exact>
                            <Checkout />
                        </Route>
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </CircularProgressWrapper>
        </div>
    );
}
