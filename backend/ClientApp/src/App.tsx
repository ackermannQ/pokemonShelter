import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Basket from './components/Basket';
import Catalog from './components/Catalog';
import ProductDetails from './components/Catalog/ProductDetails';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './components/Pages/About';
import Welcome from './components/Pages/Welcome';

import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import { useStoreContext } from './context/StoreContext';
import React from 'react';
import getCookie from './miscellanous/getCookie';
import { getBasket } from './components/Basket/httpRepository';
import { AxiosRequestConfig } from 'axios';
import { manageError } from './api/errorManager';
import CircularProgressWrapper from './components/Wrapper/CircularProgressWrapper';

export default function App() {
    const { setBasket } = useStoreContext();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const buyerId = getCookie("buyerId");

        if (buyerId) {
            getBasket()
                .then((basket: AxiosRequestConfig) => setBasket(basket.data))
                .catch(manageError)
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }

    }, [setBasket]);

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
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </CircularProgressWrapper>
        </div>
    );
}
