import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from '../../styles/Home.module.css';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const HomeCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
          <main className={styles.main}>
				<h1 className={styles.title}>Welcome to The DroneZone</h1>
				<h2> You Gotta Log In if You Wanna Do Anything</h2>
				
			</main>
      </CardContent>
    </Card>
  );
}

export default HomeCard;