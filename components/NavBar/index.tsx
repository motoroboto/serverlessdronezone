import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import { AmplifySignOut } from '@aws-amplify/ui-react'

import Link from 'next/link';
import IconButton from '@material-ui/core/IconButton';

const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
  }),
);

const navBar = ({open, handleDrawerOpen, handleDrawerClose}) => {
    console.log('this is handle drawer', handleDrawerOpen);
    const classes = useStyles();
    const theme = useTheme();

   return(

   <>
    <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="Home">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <Link href="/">Home</Link>
          </ListItem>
          <ListItem button key="Profile">
            <ListItemIcon><AccountBoxIcon /></ListItemIcon>
            <Link href="/profile">Profile</Link>
          </ListItem>
          <ListItem button key="Upload">
            <ListItemIcon><CloudUploadIcon /></ListItemIcon>
            <Link href="/upload">Upload</Link>
          </ListItem>
          <ListItem button key="Search">
            <ListItemIcon><ImageSearchIcon /></ListItemIcon>
            <Link href="/search">Search</Link>
          </ListItem>
        </List>
        <Divider />
        <AmplifySignOut />
      </Drawer>
    </>
   ) 
}
    
export default navBar;