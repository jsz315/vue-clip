import axios from 'axios'

// axios.defaults.baseURL = "http://127.0.0.1:8090";

axios.defaults.baseURL = "https://wlwol.cn";



const httpGet = function(url, data){
    return axios.get(url, {
        params: data
    })
}

const httpPost = function(url, data){
    return axios.post(url, data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export default {
    httpGet,
    httpPost
}