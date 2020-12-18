import axios from 'axios'
import config from './config'

// axios.defaults.baseURL = "http://127.0.0.1:8090";

const instance = axios.create({
    baseURL: config.verificateHost
})

instance.interceptors.request.use(function(config){
    config.headers.common["tonken"] = localStorage.getItem("token");
    return config;
})

instance.interceptors.response.use(function(response){
    return response;
})

const httpGet = function(url, data){
    return instance.get(url, {
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