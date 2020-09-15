import axios from 'axios';
import tooler from './tooler'
import request from './request'

function startUpload(file, path, fullPath) {
    console.log(path, fullPath);
    let data = new FormData();
    let temp = (path + fullPath).split("/");
    let name = temp.pop();
    data.append('path', temp.join("/"));
    data.append('file', file);
    data.append('name', name);
    data.append('tag', '0');

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

async function getImages(page, size){
    return request.httpGet('/resource/imgs', {page, size});
}

async function getTags(){
    return request.httpGet('/resource/allTags');
}

async function addResource(src, tags, desc, onProgress){
    var str = await tooler.urlToBase64(src);
    var file = tooler.dataURLtoFile(str, "file.jpg");
    let data = new FormData();
    data.append('file', file);
    data.append('tags', tags.join(","));
    data.append('desc', desc);
    return request.httpPost("/resource/add", data, {
        onUploadProgress: e => {
            onProgress && onProgress(e.loaded / e.total)
        }
    });
}

async function editResource(id, tags, desc, src, old, onProgress){
    let data = new FormData();
    data.append('id', id);
    data.append('tags', tags.join(","));
    data.append('desc', desc);
    if(src){
        var str = await tooler.urlToBase64(src);
        var file = tooler.dataURLtoFile(str, "file.jpg");
        data.append('file', file);
        data.append('old', old);
    }
    return request.httpPost("/resource/edit", data, {
        onUploadProgress: e => {
            onProgress && onProgress(e.loaded / e.total)
        }
    });
}

async function deleteResources(list){
    let data = new FormData();
    data.append('list', JSON.stringify(list));
    return request.httpPost("/resource/delete", data);
}

async function addTag(tag){
    return request.httpGet("/resource/addTag", {tag});
}

async function search(param){
    return request.httpGet("/resource/search", param);
}

//上传参数为/key
function deleteFolder(item, path){
    var key = path + item.name;
    axios.get("/yun/deleteFolder", {
        params: {url: key}
    }).then(res => {
        console.log(res.data);
    })
}

//上传参数为/key
function deleteFile(item, path){
    var key = path + item.name;
    axios.get("/yun/deleteFile", {
        params: {url: key}
    }).then(res => {
        console.log(res.data);
    })
}

export default {
    startUpload,
    deleteFolder,
    deleteFile,
    addResource,
    editResource,
    getImages,
    getTags,
    deleteResources,
    addTag,
    search
}