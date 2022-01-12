import Grid from '@mui/material/Grid';
import React from 'react';

import { IProduct } from './IProduct';
import ProductCard from './ProductCard';

interface ProductListProps {
    products: IProduct[];
}

export default function ProductList(props: ProductListProps) {
    return (
        <>
            <Grid container spacing={4}>
                {props.products.map((product: IProduct) =>
                    <Grid item xs={3} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>)}

            </Grid>
        </>
    )
}
