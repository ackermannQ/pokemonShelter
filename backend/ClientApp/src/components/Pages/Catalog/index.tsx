import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@mui/material';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { fetchFilters, fetchProductsAsync, productSelectors } from './catalogSlice';
import ProductList from './ProductList';

const useStyles = makeStyles((theme) => ({
    title: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(3, 0, 6),
    },
}));

export default function Catalog() {
    const classes = useStyles();
    const products = useAppSelector(productSelectors.selectAll);
    const { productLoaded, status, filtersLoaded } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (!productLoaded) {
            dispatch(fetchProductsAsync());
        }

    }, [dispatch, productLoaded]);

    React.useEffect(() => {
        if (!filtersLoaded) {
            dispatch(fetchFilters());
        }

    }, [dispatch, filtersLoaded]);

    if (status.includes('pending')) return <CircularProgress color="inherit" />;

    return (<>
        <Typography className={classes.title} component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Our little friends
        </Typography>
        <Container>
            <ProductList products={products} />
        </Container>
    </>);
}
