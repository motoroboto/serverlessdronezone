import axios from "axios";

const findUser = (username) => {
    return axios.get('https://ulsg7ghjha.execute-api.us-east-1.amazonaws.com/dev/api/finduser/' + username)
}

export default findUser;