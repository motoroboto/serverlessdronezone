import axios from "axios";

const populateVideos = () => {
    return axios.get('https://ulsg7ghjha.execute-api.us-east-1.amazonaws.com/dev/api/getvideos/')
}

export default populateVideos;