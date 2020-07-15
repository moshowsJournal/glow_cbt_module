import axios from 'axios';
const URL = `https://jsonplaceholder.typicode.com`;
export function getArticles(){
    const request = axios.get(`${URL}/posts`).then(response => {
        return response.data
    })
    return {
        type: 'GET_ARTICLES',
        payload:request
    }
}