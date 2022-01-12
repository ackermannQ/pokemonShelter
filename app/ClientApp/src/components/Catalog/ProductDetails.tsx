import { TableBody } from '@material-ui/core';
import { Button, Divider, Table, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { AxiosRequestConfig } from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { getProductById } from './httpRepository';
import { IProduct } from './IProduct';

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = React.useState<IProduct | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        getProductById(id)
            .then((response: AxiosRequestConfig) => setProduct(response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <>
            {loading ? <CircularProgress color="inherit" /> :
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
                        <Button component={Link} to='/shop/' color="inherit" size="large">Return</Button>
                    </Grid>
                </Grid>
            }
        </>
    )
}
