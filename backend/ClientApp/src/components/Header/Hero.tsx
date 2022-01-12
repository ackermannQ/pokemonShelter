import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

import banner from './images/banner.png'

const useStyles = makeStyles(theme => ({
    banner: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '40vh',
        fontFamily: 'Roboto',
    },
    bannerText: {
        color: '#fffff'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    bannerContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
}));

interface HeroProps {
    title: string;
    description: string;
}

export default function Hero(props: HeroProps) {
    const classes = useStyles();;

    return (
        <Paper
            className={classes.banner}
            style={{ backgroundImage: `url(${banner})` }}
        >
            {<img style={{ display: 'none' }} src={banner} alt={'No'} />}
            <div className={classes.overlay} />
            <Grid container>
                <Grid item md={6}>
                    <div className={classes.bannerContent}>
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {props.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {props.description}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Paper >
    )
}
