import axios from "axios";

const Search = (searchparameters) => {

    return axios.get('https://ulsg7ghjha.execute-api.us-east-1.amazonaws.com/api/getvideos?' + searchparameters)
}

export default Search;