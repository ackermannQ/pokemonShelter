import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import React from 'react';
import * as Router from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(0),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%',
    },
    cardContent: {
        flexGrow: 1,
    },
}));

const cards = [1];

export default function About() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Hello
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Welcome to our Pokemon shelter ❤️
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={() => window.location.href = 'mailto:pokemonShelter@love.org'}>
                                        <MailOutlineIcon className={classes.icon} />
                                        Contact 🔥
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        <Router.Link style={{ display: 'flex', textDecoration: 'none', color: 'inherit' }} to={"/magasin"}>
                                            <ReceiptOutlinedIcon className={classes.icon} />
                                            Adoption 🥰
                                        </Router.Link>
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={12} md={12}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Laura Garlatti"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h4" component="h2">
                                            Quentin Ackermann
                                        </Typography>
                                        <Typography variant="h5">
                                            It's heart broken for a fellow Full Stack Engineer to see all these cute little Pokemons without a family.
                                        </Typography>
                                        <Typography style={{ marginTop: '10px' }}>
                                            As a consequence, I've decided to build this website to find a new home for all the Pokemons I've found.
                                        </Typography>
                                        <Typography style={{ marginTop: '10px' }}>
                                            The front end is built with ReactJS, the backend using .Net Core 3.6/C#, the database is managed with SQL Management Server.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}
