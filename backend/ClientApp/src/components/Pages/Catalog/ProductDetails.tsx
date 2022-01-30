import { TableBody } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import { Button, CircularProgress, Divider, Table, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { AxiosRequestConfig } from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { manageError } from '../../../api/errorManager';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { setBasket } from '../../Basket/basketSlice';
import { add } from '../../Basket/httpRepository';
import CircularProgressWrapper from '../../Wrapper/CircularProgressWrapper';
import { fetchProductAsync, productSelectors } from './catalogSlice';

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const product = useSelector((state: any) => productSelectors.selectById(state, id));
    const [isButtonLoading, setIsButtonLoading] = React.useState(false);
    const dispatch = useAppDispatch();
    const { status } = useAppSelector(state => state.catalog);


    React.useEffect(() => {
        if (!product) dispatch(fetchProductAsync(parseInt(id)));
    }, [dispatch, id, product]);

    function handleAddItem(productId: number) {
        setIsButtonLoading(true);
        add(productId).then((response: AxiosRequestConfig) => dispatch(setBasket(response.data))).catch(manageError).finally(() => setIsButtonLoading(false));
    }

    if (status.includes('pending')) return <CircularProgress color="inherit" />;

    if (!product) return <p>No products found!</p>

    return (
        <CircularProgressWrapper isLoading={status.includes('fulfilled')}>
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <img src={product?.pictureUrl} alt={product?.name} style={{ width: '50%' }} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h2">{product?.name}</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="h4" color="secondary">{product?.price && (product?.price / 10).toFixed(2)}</Typography>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>What we could say about it</TableCell>
                                    <TableCell>{product?.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Type(s)</TableCell>
                                    <TableCell>{product?.type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Available</TableCell>
                                    <TableCell>{product?.quantityInStock}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {product ? <LoadingButton loading={isButtonLoading} onClick={() => handleAddItem(product.id)} color='inherit' size="large">Adopt</LoadingButton> : null}
                    <Button component={Link} to='/shop/' color="inherit" size="small">Return</Button>
                </Grid>
            </Grid>
        </CircularProgressWrapper>
    )
}
