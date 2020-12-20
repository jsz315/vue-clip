import axios from 'axios'
import config from './config'

// axios.defaults.baseURL = "http://127.0.0.1:8090";

const instance = axios.create({
    baseURL: config.verificateHost
})

instance.interceptors.request.use(function(config){
    config.headers.common["token"] = localStorage.getItem("token");
    return config;
}, function(err){
    console.warn("request err");
    console.error(err)
    return Promise.resolve({data: {code: 500, msg: "无法连接服务器"}});
})

instance.interceptors.response.use(function(response){
    return response;
}, function(err){
    console.warn("response err");
    console.error(err);
    return Promise.resolve({data: {code: 400, msg: "服务器异常[" + err.message + "]"}});
})

const httpGet = function(url, data){
    return instance.get(url, {
        params: data
    })
}

const httpPost = function(url, data, config){
    var formData = new FormData();
    for(var i in data){
        formData.append(i, data[i]);
    }
    return instance.post(url, formData, Object.assign(config || {}, {
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