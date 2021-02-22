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
	const [cognitoUser, setCognitoUser] = useState(null);
	const [formData, setFormData] = useState<userDataList>(Object);

	useEffect(() => {

		Auth.currentAuthenticatedUser()
			.then((user) => {
				setCognitoUser(user);
				
				findUserProfile(user.username).then((profiledata) => {
					if (profiledata.data === null) {
						setFormData({username: user.username} as Pick<userDataList, keyof userDataList>)
					} else {
						setFormData(profiledata.data);
					}
				});
			})
			.catch(() => setCognitoUser(null));
	}, []);

	const handleProfileInputs = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleUserUpdate = () => {
		if (!formData._id){
			axios({
                method: "post",
                url:
                    "https://ulsg7ghjha.execute-api.us-east-1.amazonaws.com/dev/api/createuser/",
                data: formData,
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    console.log("this worked");
                } else {
                    console.log("ERROOOOR");
                }
            });

		} else {
			axios({
				method: "put",
				url:
					"https://ulsg7ghjha.execute-api.us-east-1.amazonaws.com/dev/api/updateuser/" +
					formData.username,
				data: formData,
			}).then((res) => {
				console.log(res);
				if (res.status === 200) {
					console.log("this worked");
					alert("Your profile was successfully updated");
				} else {
					console.log("ERROOOOR");
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
									<h4 className="title">{formData?.username}</h4>
								</a>
								<p className="userhandle">
									<a
										href={`http://instagram.com/${formData?.instagram}`}
										target="_blank"
									>
										{`@${formData?.instagram} ` ||
											"Update your profile to render social media handle"}
									</a>
								</p>
							</div>
							<p className="userdescription text-center">{formData?.aboutme}</p>
						</CardContent>
					</Card>
				</Grid>
				<Grid item sm={6}>
					<Card style={{ padding: "10px" }}>
						<CardHeader
							style={{ textAlign: "left" }}
							title={cognitoUser && <h5>Welcome, {cognitoUser.username} Edit Profile</h5>}
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
											value={formData?.company || ""}
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
											value={ formData?.instagram || ""}
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
											value={formData?.emailaddress || ""}
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
											value={formData?.firstname || ""}
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
											value={formData?.lastname || ""}
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
											value={formData?.address || ""}
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
											value={formData?.city || ""}
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
											value={formData?.country || ""}
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
											value={formData?.postalcode || ""}
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
											value={formData?.aboutme || ""}
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
