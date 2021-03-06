// const host = "https://wlwol.cn";
// const host = "http://119.28.7.223:9090";
const host = getHost();
const cvm = host + "/asset/upload";
const cos = "http://resoure-1251324668.cos.ap-guangzhou.myqcloud.com";

// const verificateHost = "http://106.54.75.203:8899";
const verificateHost = host;

const proxyHost = "https://www.madman.fun";
const temp = proxyHost + "/asset/temp";

function getHost(){
    if(location.hostname == "localhost" || location.hostname == "127.0.0.1" || location.hostname.indexOf("192.168") != -1){
        return "https://www.wlwol.cn";
    }
    return "";
}

const createName = function(min){
    var name = Date.now() + "_" + Math.floor(Math.random() * 10000);
    if(min){
        name = name + "_min"; 
    }
    return name + ".jpg";
}

const cvmPath = function(name){
    return cvm + "/" + name;
}

const cosPath = function(name){
    return cos + "/" + name;
}

const minPath = function(url){
    return url.replace(/(\.\w+$)/, "_min$1");
}

const tempPath = function(name){
    return temp + "/" + name;
}


export default {
    cvmPath,
    cosPath,
    minPath,
    tempPath,
    createName,
    host,
    proxyHost,
    verificateHost
}