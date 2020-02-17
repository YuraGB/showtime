import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbilder-2a31b.firebaseio.com/'
});

export default instance;