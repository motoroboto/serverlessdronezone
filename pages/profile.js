const axios = require("axios");
import { useState, useEffect } from "react";
import Head from "next/head";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import Image from "next/image";
import {
	Avatar,
	Button,
	Card,
	CardHeader,
	CardMedia,
	CardTitle,
	CardContent,
	FormControl,
	FormGroup,
	TextField,
	Input,
	Grid,
	FormLabel,
} from "@material-ui/core";
import { Auth } from "aws-amplify";
import findUserProfile from "./../pages/api/Finduser";

const Profile = () => {
	const [user, setUser] = useState(null);
	const [userData, setUserData] = useState({});

	useEffect(async () => {
		await Auth.currentAuthenticatedUser()
			.then((user) => {
				setUser(user);
				findUserProfile(user.username).then((profiledata) => {
					console.log("this is the setup for user profile", profiledata);
					setUserData(profiledata.data);
				});
			})
			.catch(() => setUser(null));
	}, []);

	console.log("user profile data", userData);

	const handleProfileInputs = (event) => {
		// console.log('event target name is', event.target.name);
		// console.log('event target value is', event.target.value);
		const { name, value } = event.target;
		setUserData({
			...userData,
			[name]: value,
		});
	};

	const handleUserUpdate = () => {
		console.log("user profile inputs", userData);
		axios({
			method: "put",
			url:
				"https://ulsg7ghjha.execute-api.us-east-1.amazonaws.com/dev/api/updateuser/" +
				user.username,
			data: userData,
		}).then((res) => {
			console.log(res);
			if (res.status === 200) {
				console.log("this worked");
				alert("Your profile was successfully updated");
			} else {
				console.log("ERROOOOR");
			}
		});
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
				alignItems="center"
				justify="center"
				style={{ minHeight: "60vh" }}
			>
				<Grid item sm={6}>
					<Card>
						<CardMedia
							component="img"
							alt="cardphoto"
							height="140"
							image="/cardbackground.jpg"
							title="cardphoto"
						/>
						<CardContent>
							<div className="author">
								<a href="#userimg" onClick={(e) => e.preventDefault()}>
									<Image
										alt="userphoto"
										src="/stockuser.png"
										width={50}
										height={50}
									/>
									<h4 className="title">{userData?.username}</h4>
								</a>
								<p className="userhandle">
									<a href={`http://instagram.com/${userData.instagram}`}>
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
					<Card style={{ padding: "10px" }}>
						<CardHeader
							style={{ textAlign: "left" }}
							title={user && <h5>Welcome, {user.username} Edit Profile</h5>}
						></CardHeader>
						<form style={{ margin: "5px" }}>
							<Grid container spacing={2}>
								<Grid item xs={5}>
									<FormGroup>
										<TextField
											id="outlined-search"
											label="Company"
											variant="outlined"
											name="company"
											value={userData.company || ""}
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
											value={userData.instagram || ""}
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
											value={userData.emailaddress || ""}
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
											value={userData.firstname || ""}
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
											value={userData.lastname || ""}
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
											value={userData.address || ""}
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
											value={userData.city || ""}
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
											value={userData.country || ""}
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
											value={userData.postalcode || ""}
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
											value={userData.aboutme || ""}
											onChange={(e) => handleProfileInputs(e)}
										/>
									</FormGroup>
								</Grid>
								<Grid item xs={12} style={{ textAlign: "center" }}>
									<Button
										color="primary"
										style={{ backgroundColor: "blue", color: "white" }}
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
		</div>
	);
};

export default withAuthenticator(Profile);
