import { Container } from '@material-ui/core';
import { CircularProgress, Typography } from '@mui/material';
import { AxiosRequestConfig } from 'axios';
import React from 'react';

import { getAllProducts } from './httpRepository';
import { IProduct } from './IProduct';
import ProductList from './ProductList';

export default function Catalog() {
    const [products, setProducts] = React.useState<IProduct[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        getAllProducts()
            .then((response: AxiosRequestConfig) => setProducts(response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    return (<>
        <Typography variant='h3' sx={{ marginBottom: 10 }}>Our little friends</Typography>
        <Container>
            {loading ? <CircularProgress color="inherit" /> : <ProductList products={products} />}
        </Container>
    </>
    );
}
