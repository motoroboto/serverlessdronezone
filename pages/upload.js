import React from "react";
import Head from "next/head";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Uploader from "../components/Uploader";

const Upload = () => {
	return (
		<>
			<Container style={{ width: "80%", alignItems: "center" }}>
				<Card style={{ height: "300px" }}>
					<Grid
						container
						spacing={0}
						direction="column"
						alignItems="center"
						justify="center"
						style={{ minHeight: "25vh" }}
					>
						<Head>
							<title>DroneZones: Uploads</title>
							<link rel="icon" href="/favicon.ico" />
						</Head>
						<Uploader />
					</Grid>
				</Card>
			</Container>
		</>
	);
};

export default Upload;
