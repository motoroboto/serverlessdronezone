import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SearchResults from '../../components/SearchResults';
import MetaData from '../../data/index.json';
import PopulateVideos from '../api/API';

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

const SearchPage = () => {
    const classes = useStyles();
    const [search, setSearch] = useState([])
    const [videos, setVideos] = useState([])
    const [searchedVideos, setSearchedVideos] = useState([]);

    useEffect(() => {
        PopulateVideos().then((res) => {
            if (res.data.length === 0) {
                throw new Error("No results found.");
            }
            if (res.data.status === "error") {
                throw new Error(res.data.message);
            }
            setVideos(res.data);
            setSearchedVideos(res.data)

        }).catch((error) => console.log(error));
    }, [])

    const handleSearch = (e) => {
        // e.preventDefault();

        // let queryParams = [];
        // for (const [key, value] of Object.entries(search)) {
        // 	queryParams.push(`${key}=${value}`);
        // }
        // const searchparameters = queryParams.join("")

        // console.log("these are the query params", searchparameters);
        // console.log(search);

        // SearchVideos(searchparameters).then((res)=> {
        //   if (res.data.length === 0) {
        // 			throw new Error("No results found.");
        // 		}
        // 		if (res.data.status === "error") {
        // 			throw new Error(res.data.message);
        // 		}
        // 		console.log(res);
        // }).catch((error) => console.log(error));

    };

    const handleChange = (e) => {
        console.log('this is the event', e.target.value)
        const searchQuery = e.target.value;
        const searchQueryList = videos.filter((video) => {
            let values = Object.values(video).join("").toLowerCase();

            return values.indexOf(searchQuery.toLowerCase()) !== -1;
        });
        setSearchedVideos(searchQueryList);
    };

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <SearchResults videos={searchedVideos} handleChange={handleChange} />
            </CardContent>
        </Card>
    );
}

export default SearchPage;