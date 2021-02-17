import React from 'react'
import Head from 'next/head'
import Grid from '@material-ui/core/Grid';
import Uploader from '../components/Uploader'


const Upload = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '25vh' }}
        >
            <Head>
                <title>DroneZones: Uploads</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Uploader />
        </Grid>
    )
}

export default Upload