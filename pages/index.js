import Head from "next/head";
import styles from "../styles/Home.module.css";
import Container from "@material-ui/core/Container";
import HomeCard from "../components/HomeCard";

export default function Home() {
	// const useStyles = makeStyles(styles);
	// const classes = useStyles();
	return (
		<Container className={styles.container}>
			<HomeCard />
		</Container>
	);
}
