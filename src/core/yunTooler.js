const axios = require('axios');

function startUpload(file, path, fullPath) {
    console.log(path, fullPath);
    let data = new FormData();
    let temp = (path + fullPath).split("/");
    let name = temp.pop();
    data.append('path', temp.join("/"));
    data.append('file', file);
    data.append('name', name);

    return new Promise(resolve=>{
        axios({
            method: 'post',
            timeout: 6000,
            url: 'http://127.0.0.1:8899/yun/upload',
            data: data
        })
        .then(response => {
            console.log(response.data)
            resolve(true)
        })
        .catch(error => {
            console.log(error)
            resolve(false)
        })
    })
    
}

//上传参数为/key
function deleteFolder(item, path){
    var key = path + item.name;
    axios.get("/yun/deleteFolder", {
        params: {url: key}
    }).then(res => {
        console.log(res.data);
    });
}

//上传参数为/key
function deleteFile(item, path){
    var key = path + item.name;
    axios.get("/yun/deleteFile", {
        params: {url: key}
    }).then(res => {
        console.log(res.data);
    });
}

export default {
    startUpload,
    deleteFolder,
    deleteFile
}