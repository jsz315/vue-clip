// const host = "http://127.0.0.1:8090";
const host = "https://wlwol.cn/asset";

const getPath = function(name){
    return host + "/upload/" + name;
}

export default {
    host,
    getPath
}