import axios from 'axios'

axios.defaults.baseURL = "http://127.0.0.1:8899";

const httpGet = function(url, data){
    return axios.get(url, {
        params: data
    })
}

const httpPost = function(url, data){
    return axios.post(url, data)
}

export default {
    httpGet,
    httpPost
}