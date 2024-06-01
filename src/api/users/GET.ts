import { users_endpoint } from '../endpoints';
import axios from 'axios';

export const GET_USERS = () =>
    axios
        .get(users_endpoint)
        .then((res) => res.data)
        .catch((err) => console.log(err));
