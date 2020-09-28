// const host = "http://127.0.0.1:8090";
const host = "https://wlwol.cn/asset";
const cos = "http://resoure-1251324668.cos.ap-guangzhou.myqcloud.com";

const getPath = function(name){
    if(name.indexOf("_") == -1){
        return host + "/upload/" + name;
    }
    return cosPath(name);
}

const cosPath = function(name){
    return cos + "/" + name;
}

export default {
    host,
    getPath,
    cosPath
}