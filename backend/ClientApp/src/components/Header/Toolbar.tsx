import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import React from 'react';
import * as Router from 'react-router-dom';

import { useAppSelector } from '../../store/configureStore';
import CartButton from '../CartButton';
import pokeball from './images/pokeball.png'

const useStyles = makeStyles(theme => ({
    toolbarSecondary: {
        justifyContent: 'space-evenly',
        color: 'white',
        overflowX: 'auto',
        background: '#000000',
        fontFamily: 'Roboto',
        fontSize: '15px'
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}));

interface SecondaryToolbarProps {
    sections: Array<{
        title: string,
        url: string
    }>
}

const theme = createTheme();

theme.typography.subtitle1 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2.4rem',
    },
};

export default function SecondaryToolbar(props: SecondaryToolbarProps) {
    const classes = useStyles();
    const { basket } = useAppSelector(state => state.basket);
    const itemsCount = basket?.items ? basket?.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

    return (
        <React.Fragment>
            <AppBar position="sticky">
                <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                    <Typography
                        component="h2"
                        variant="h5"
                        color="inherit"
                        align="center"
                        noWrap
                    >
                        <img src={pokeball} alt="Pokeball" width={'20'} />
                        <Router.Link style={{ marginLeft: '15px', textDecoration: 'none', color: 'inherit' }} to="/">PokemonShelter</Router.Link>
                    </Typography>
                    {props.sections?.map(section => (
                        <Router.Link
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            key={section.title}
                            to={section.url}
                            className={classes.toolbarLink}
                        >
                            <ThemeProvider theme={theme}>
                                <Typography variant="subtitle1">
                                    {section.title}
                                </Typography>
                            </ThemeProvider>
                        </Router.Link>
                    ))}
                    <CartButton
                        badgeContent={itemsCount}
                    />
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
