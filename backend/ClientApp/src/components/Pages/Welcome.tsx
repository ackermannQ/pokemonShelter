import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography/Typography';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

import { manageError } from '../../api/errorManager';
import welcome from './images/welcome.jpg'

const useStyles = makeStyles((theme) => ({
    title: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(3, 0, 6),
    },
    content: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(0),
    },
    image: {
        marginTop: theme.spacing(5)
    }
}));

export default function Welcome() {
    const classes = useStyles();

    return (
        <div className={classes.title}>
            <Container maxWidth="md">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Fancy seeing you here
                </Typography>
                <Typography variant="h3" align="center" paragraph>
                    💕
                </Typography>
                <Grid className={classes.content} container spacing={4}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography gutterBottom variant="h4" component="h2" color="textSecondary">
                            With your help we want to give every single Pokemon a loving family
                        </Typography>
                        <img className={classes.image} src={welcome} alt="Pokemon" />
                    </Grid>
                    <Container className={classes.content} maxWidth="sm">
                        <Button size="large" color="inherit" component={Link} to='/shop/'>Adopt</Button>
                        <Button style={{ marginLeft: '10px' }} component={Link} to='/about/' variant="outlined" size="large" color="inherit">About us</Button>
                        {/* <Button style={{ marginLeft: '10px' }} variant="outlined" size="large" color="secondary" onClick={triggerError}>Error Test</Button> */}
                    </Container>
                </Grid>
            </Container>
        </div>
    );

}

// function triggerError() {
//     axios.get('/api/Buggy/validation-error').catch(manageError);
// }
