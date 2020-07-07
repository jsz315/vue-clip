const host = "http://127.0.0.1:8899";

const getPath = function(name){
    return host + "/upload/" + name;
}

export default {
    host,
    getPath
}