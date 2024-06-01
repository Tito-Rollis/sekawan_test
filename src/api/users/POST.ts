import { users_endpoint } from '../endpoints';
import axios from 'axios';

export type UserData = {
    createdAt: number;
    email: string;
    password: string;
    role: string;
    id: string;
};

export const POST_USERS = (data: UserData) =>
    axios
        .post(users_endpoint, data)
        .then((res) => res.data)
        .catch((err) => console.log(err));
