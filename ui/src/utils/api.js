import axios from 'axios';


export const makePostRequest = (route, payload) => {
    let req = axios.post(route, payload);
    return req;
}

export const makeGetRequest = route => {
    let req = axios.get(route);
    return req;
}
