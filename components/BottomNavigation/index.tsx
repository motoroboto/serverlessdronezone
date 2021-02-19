import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import InfoIcon from '@material-ui/icons/Info';
import GithubIcon from '@material-ui/icons/GitHub';
import SearchIcon from '@material-ui/icons/Search';
import Link from 'next/link';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles({
    root: {
        width: 500,
    },
    typography: {
        align: "center"
    }
});
export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    return (
        <Container>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={classes.typography}
            >
                <Link href="/">
                    <BottomNavigationAction label="About" icon={<InfoIcon />} />
                </Link>
                <Link href="/">
                    <BottomNavigationAction label="Github" icon={<GithubIcon />} />
                </Link>
                <Link href="/SearchPage">
                    <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                </Link>
            </BottomNavigation>
        </Container>
    );
}