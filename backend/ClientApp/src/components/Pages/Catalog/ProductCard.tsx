import { Button, Typography } from '@material-ui/core';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { addBasketItemAsync } from '../../Basket/basketSlice';
import { IProduct } from './IProduct';

interface ProductCardProps {
    product: IProduct;
}

export default function ProductCard(props: ProductCardProps) {
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (
        <>
            <Card sx={{ maxHeight: 400 }}>
                <CardHeader
                    avatar={
                        <Avatar
                            sx={{ bgcolor: 'darkgray' }}
                        >
                            {props.product.name.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={props.product.name}
                    titleTypographyProps={{
                        sx: { fontWeight: 'bold', color: 'black' }
                    }}
                />
                <CardMedia
                    component="img"
                    title={props.product.name}
                    sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'lightgray' }}
                    image={props.product.pictureUrl}
                />
                <CardContent>
                    <Typography gutterBottom color='secondary' variant="h5">
                        {(props.product.price / 10).toFixed(2)} €
                    </Typography>
                    <Typography variant="body2">
                        {props.product.type}
                    </Typography>
                </CardContent>
                <CardActions>
                    <LoadingButton loading={status.includes('pendingAddItem' + props.product.id)} onClick={() => dispatch(addBasketItemAsync({ productId: props.product.id }))} color='inherit' size="small">Adopt</LoadingButton>
                    <Button style={{ marginLeft: '10px' }} component={Link} to={`/shop/${props.product.id}`} variant="outlined" size="small">More</Button>
                </CardActions>
            </Card>
        </>
    )
}
