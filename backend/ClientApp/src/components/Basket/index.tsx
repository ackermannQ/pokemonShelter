import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../store/configureStore';
import { IBasket } from './interfaces';
import Table from './Table/index';

const useStyles = makeStyles((theme) => ({
    title: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(3, 0, 6),
    },
    content: {
        marginTop: theme.spacing(6),
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(0),
    },
}));

export default function Basket() {
    const classes = useStyles();
    const { basket } = useAppSelector(state => state.basket);

    return (
        <div className={classes.title}>
            <Container maxWidth="md">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    So you are ready to adopt?
                </Typography>
                <Typography variant="h3" align="center" paragraph>
                    💖
                </Typography>
                <Grid className={classes.content} container spacing={4}>
                    <Grid item xs={12} sm={12} md={12}>
                        {basket && basket.items.length > 0 &&
                            <>
                                <Typography gutterBottom variant="h4" component="h2" color="textSecondary">
                                    {addPlural("Remember to take good care of your new friend", basket)}
                                </Typography>
                                <Typography style={{ marginBottom: '40px' }} gutterBottom variant="h6" component="h2" color="textSecondary">
                                    We will check-in every once in a while 👍
                                </Typography>
                            </>}
                        <Table basket={basket} />
                    </Grid>
                    <Container className={classes.content} maxWidth="sm">
                        <Button style={{ marginLeft: '10px' }} component={Link} to='/shop/' variant="outlined" size="large" color="inherit">Return</Button>
                        {basket && basket.items.length > 0 && <Button size="large" color="inherit" component={Link} to='/checkout/'>Yay!</Button>}
                    </Container>
                </Grid>
            </Container>
        </div>
    )
}

function addPlural(sentence: string, basket: IBasket) {
    const basketItems = basket.items;

    if (basketItems.length > 1 || basketItems[0].quantity > 1) {
        return sentence + 's.'
    }

    return sentence + '.'
}
