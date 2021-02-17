import React from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Hidden from '@material-ui/core/Hidden'
import Link from '@material-ui/core/Link'
import {
    AmplifyAuthenticator,
    AmplifySignOut,
    AmplifySignIn,
    AmplifySignUp,
} from '@aws-amplify/ui-react'
import Container from '@material-ui/core/Container'

import SearchPage from '../pages/SearchPage';

const useStyles = makeStyles(theme => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    toolbarTitle: {
        flex: 1
    },
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.7)'
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0
        }
    },
    card: {
        display: 'flex'
    },
    cardDetails: {
        flex: 1
    },
    cardMedia: {
        width: 160
    }
}))

const featuredPosts = [
    {
        title: 'Featured post',
        date: 'Nov 12',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.'
    },
    {
        title: 'Post title',
        date: 'Nov 11',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.'
    }
]

const Results = () => {
    const classes = useStyles()

    return (
        <>
            <Head>
                <title>DroneZones: Uploads</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AmplifyAuthenticator>

                <CssBaseline />
                <Container maxWidth="lg">
                    <Toolbar className={classes.toolbar}>
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            Drone Zone Search
          </Typography>
                    </Toolbar>
                    <main>
                        <SearchPage />
                    </main>
                </Container>
            </AmplifyAuthenticator>
        </>
    )
}

export default Results