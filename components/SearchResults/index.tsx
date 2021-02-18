import React from "react";
import styles from '../../styles/Search.module.css';
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    table: {
        minWidth: 700,
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const SearchInputs = ({ videos, handleChange, }) => {
    const classes = useStyles();

    return (
        <>
            <br></br>
            <Card >
                <div className={styles.containerfluid}>
                <form className={styles.searchform} id="searchform" onChange={handleChange} >
                            <div className="formgroup">
                            <input
							name="search"
							list="search"
							type="text"
							className={styles.formcontrol}
							placeholder="Search Drone Videos"
							id="search"
						/>
                        </div>
                </form>
                </div>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Media Name</StyledTableCell>
                                            <StyledTableCell align="right">Description</StyledTableCell>
                                            <StyledTableCell align="right">Date</StyledTableCell>
                                            <StyledTableCell align="right">Region</StyledTableCell>
                                            <StyledTableCell align="right">Video URL</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {videos.map((video) => (

                                            <StyledTableRow key={video._id}>
                                                <StyledTableCell component="th" scope="row">
                                                    {video.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{video.description}</StyledTableCell>
                                                <StyledTableCell align="right">{video.date}</StyledTableCell>
                                                <StyledTableCell align="right">{video.region}</StyledTableCell>
                                                <StyledTableCell align="right">{video.url}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
            </Card>
        </>
    );
};

export default SearchInputs;