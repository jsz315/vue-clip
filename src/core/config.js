// const host = "http://127.0.0.1:8090";
const cvm = "https://wlwol.cn/asset/upload";
const cos = "http://resoure-1251324668.cos.ap-guangzhou.myqcloud.com";

// const getPath = function(name){
//     if(name.indexOf("_") == -1){
//         return host + "/upload/" + name;
//     }
//     return cosPath(name);
// }

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


export default {
    cvmPath,
    cosPath,
    minPath,
    createName
}