import axios from 'axios'
import config from './config'

// axios.defaults.baseURL = "http://127.0.0.1:8090";

axios.defaults.baseURL = config.host;

const httpGet = function(url, data){
    return axios.get(url, {
        params: data
    })
}

const httpPost = function(url, data, config){
    return axios.post(url, data, Object.assign(config || {}, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    ));
}

export default {
    httpGet,
    httpPost
}