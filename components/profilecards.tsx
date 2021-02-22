
import React, { useState, useEffect } from "react";
import cx from 'clsx';
import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Image from "next/image";
import {
    Avatar,
    Button,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    FormControl,
    FormGroup,
    TextField,
    Input,
    Grid,
    FormLabel,
} from "@material-ui/core";
import findUserProfile from "../../pages/api/Finduser";
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN03TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n03';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const axios = require("axios");
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        // maxWidth: ,
        borderRadius: 0,
        borderBottom: "2px solid #f4a261"

    },
    content: {
        padding: 24,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalStyle: {
        backgroundColor: theme.palette.background.paper,
        border: '3px solid #2A9D8F',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(5, 5, 5),
        outline: "none"
    },
}));

const Profile = () => {
    const styles = useN03TextInfoContentStyles();
    const shadowStyles = useLightTopShadowStyles();
    const cardStyles = useStyles();
    const classes = useStyles();
    const [cognitoUser, setCognitoUser] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [modalText, setModalText] = useState(null);
    const [userID, setUserID] = useState(null);
    type userDataList = {
        _id: string,
        username: string,
        company: string,
        instagram: string,
        emailaddress: string,
        firstname: string,
        lastname: string,
        address: string,
        city: string,
        country: string,
        postalcode: string,
        aboutme: string
    }
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState<userDataList>(Object);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then((user) => {
                setUser(user);
                console.log('user:', user.username);
                setCognitoUser(user.username);
                findUserProfile(user.username).then((profiledata) => {
                    console.log("this is the setup for user profile", profiledata);
                    setUserData(profiledata.data);
                    setUserID(profiledata._id)
                    console.log('this is your user ID:', userID)
                });
            })
            .catch(() => setUser(null));
    }, []);
    console.log('is this your name?', cognitoUser);
    console.log("user profile data", userData);

    const handleProfileInputs = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleUserUpdate = () => {
        setUserData({
            ...userData,
            username: cognitoUser,
        });
        if (!userData._id) {
            axios({
                method: "post",
                url:
                    "https://ulsg7ghjha.execute-api.us-east-1.amazonaws.com/dev/api/createuser/",
                data: userData,
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    console.log("this worked");
                    setModalText("Your profile was successfully created");
                    handleOpen();
                } else {
                    console.log("ERROOOOR");
                    setModalText("There was an error updating your profile");
                    handleOpen();
                }
            });
        } else {
            axios({
                method: "put",
                url:
                    "https://ulsg7ghjha.execute-api.us-east-1.amazonaws.com/dev/api/updateuser/" + cognitoUser,
                data: userData,
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    console.log("this worked");
                    setModalText("Your profile was successfully updated");
                    handleOpen();
                } else {
                    console.log("ERROOOOR");
                    setModalText("There was an error updating your profile");
                    handleOpen();
                }
            });


        }
    };


    return (

        <div>
            <Head>
                <title>DroneZones: Profile</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid
                container
                spacing={3}
                // alignItems="center"
                justify="center"
                style={{ minHeight: "60vh" }}
            >
                <Grid item sm={6}>
                    <Card
                        className={cx(cardStyles.root, shadowStyles.root)}
                        style={{ marginTop: '12vh' }}
                    >
                        <BrandCardHeader
                            image={
                                '/headers/profile.png'
                            }
                            extra={userData?.username || "Profile"}
                        />

                        <CardContent>
                            <div className="author">
                                <a href="#userimg" onClick={(e) => e.preventDefault()}>
                                    {/* <Image
                                        alt="userphoto"
                                        src="/headers/profile.png"
                                        width={50}
                                        height={50}
                                    /> */}

                                    <h4 className="title">{userData?.firstname} {userData?.lastname}</h4>
                                </a>
                                <p className="userhandle">
                                    <a
                                        href={`http://instagram.com/${userData?.instagram}`}
                                        target="_blank"
                                    >
                                        {`@${userData?.instagram} ` ||
                                            "Update your profile to render social media handle"}
                                    </a>
                                </p>
                            </div>
                            <p className="userdescription text-center">{userData?.aboutme}</p>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={6}>
                    <Card
                        className={cx(cardStyles.root, shadowStyles.root)}

                    >
                        <CardMedia
                            component="img"
                            alt="cardphoto"
                            height="120px"
                            image="/backgrounds/cardheader.jpg"
                            title="cardphoto"
                        />
                        <CardHeader
                            style={{ textAlign: "left" }}
                            title={user && <h5>Hello {userData?.firstname}</h5>}
                            subheader={<h6>Edit Profile Info Here</h6>}
                        ></CardHeader>
                        <form style={{ margin: "1vw" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <FormGroup>
                                        <TextField
                                            id="outlined-search"
                                            label="Company"
                                            variant="outlined"
                                            name="company"
                                            value={userData?.company || ""}
                                            onChange={(e) => handleProfileInputs(e)}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormGroup>
                                        <TextField
                                            id="outlined-search"
                                            label="Instagram"
                                            variant="outlined"
                                            name="instagram"
                                            value={userData?.instagram || ""}
                                            onChange={(e) => handleProfileInputs(e)}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormGroup>
                                        <TextField
                                            id="outlined-search"
                                            label="Email address"
                                            variant="outlined"
                                            name="emailaddress"
                                            value={userData?.emailaddress || ""}
                                            onChange={(e) => handleProfileInputs(e)}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormGroup>
                                        <TextField
                                            id="outlined-search"
                                            label="First Name"
                                            variant="outlined"
                                            name="firstname"
                                            value={userData?.firstname || ""}
                                            onChange={(e) => handleProfileInputs(e)}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormGroup>
                                        <TextField
                                            id="outlined-search"
                                            label="Last Name"
                                            variant="outlined"
                                            name="lastname"
                                            value={userData?.lastname || ""}
                                            onChange={(e) => handleProfileInputs(e)}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormGroup>
                                        <TextField
                                            id="outlined-search"
                                            label="Address"
                                            variant="outlined"
                                            name="address"
                                            value={userData?.address || ""}
                                            onChange={(e) => handleProfileInputs(e)}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormGroup>
                                        <TextField
                                            id="outlined-search"
                                            label="City"
                                            variant="outlined"
                                            name="city"
                                            value={userData?.city || ""}
                                            onChange={(e) => handleProfileInputs(e)}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormGroup>
                                        <TextField
                                            id="outlined-search"
                                            label="Country"
                                            variant="outlined"
                                            name="country"
                                            value={userData?.country || ""}
                                            onChange={(e) => handleProfileInputs(e)}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormGroup>
                                        <TextField
                                            id="outlined-search"
                                            label="Postal Code"
                                            variant="outlined"
                                            name="postalcode"
                                            value={userData?.postalcode || ""}
                                            onChange={(e) => handleProfileInputs(e)}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormGroup>
                                        <TextField
                                            id="outlined-search"
                                            label="About Me"
                                            variant="outlined"
                                            name="aboutme"
                                            value={userData?.aboutme || ""}
                                            onChange={(e) => handleProfileInputs(e)}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12} style={{ textAlign: "right" }}>
                                    <Button
                                        color="primary"
                                        className='btn'
                                        variant="contained"
                                        style={{ backgroundColor: "#E76F51", color: "white" }}
                                        onClick={handleUserUpdate}
                                    >
                                        Update Profile
									</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
            </Grid>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.modalStyle}>
                        <h2 id="transition-modal-title">{modalText}</h2>
                        {/* <p id="transition-modal-description">react-transition-group animates me.</p> */}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default withAuthenticator(Profile);