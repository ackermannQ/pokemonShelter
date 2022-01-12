import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@mui/material';
import { AxiosRequestConfig } from 'axios';
import React from 'react';

import { getAllProducts } from './httpRepository';
import { IProduct } from './IProduct';
import ProductList from './ProductList';

const useStyles = makeStyles((theme) => ({
    title: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(3, 0, 6),
    },
}));

export default function Catalog() {
    const classes = useStyles();
    const [products, setProducts] = React.useState<IProduct[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        getAllProducts()
            .then((response: AxiosRequestConfig) => setProducts(response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);


    return (<>
        <Typography className={classes.title} component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Our little friends
        </Typography>
        <Container>
            {loading ? <CircularProgress color="inherit" /> : <ProductList products={products} />}
        </Container>
    </>
    );
}
