import { useState, useEffect } from 'react';
import Head from 'next/head'
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import Grid from '@material-ui/core/Grid';
import { Auth } from 'aws-amplify';

function Profile() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                console.log("user", user);
                setUser(user);
            })
            .catch(() => setUser(null))
    }, [])
    return (
        <div>
            <Head>
                <title>DroneZones: Profile</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '60vh' }}
            >
                <Grid item>

                    {user && <h1>Welcome, {user.username}</h1>}
                    <AmplifySignOut />
                </Grid>
            </Grid>
        </div>
    )
}

export default withAuthenticator(Profile);