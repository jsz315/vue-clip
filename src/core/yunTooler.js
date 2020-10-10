import axios from 'axios';
import tooler from './tooler'
import request from './request'
// import cosTooler from './cosTooler'
import fileTooler from './fileTooler'
import config from './config'

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

async function getTotal(){
    return request.httpGet('/resource/total');
}

async function uploadMin(src, canvas, filename, onProgress){
    var file = await fileTooler.urlToFile(src, canvas, true, filename.replace(".", "_min."));
    let data = new FormData();
    data.append('file', file);
    return request.httpPost("/resource/min", data, {
        onUploadProgress: e => {
            onProgress && onProgress(e.loaded / e.total)
        }
    });
}

async function addResource(src, tags, desc, onProgress, canvas){
    var str = await tooler.urlToBase64(src);
    var filename = config.createName(false);
    await uploadMin(src, canvas, filename);
    var file = tooler.dataURLtoFile(str, filename);
    let data = new FormData();
    data.append('file', file);
    // data.append('min', min);
    data.append('tags', tags.join(","));
    data.append('desc', desc);
    return request.httpPost("/resource/add", data, {
        onUploadProgress: e => {
            onProgress && onProgress(e.loaded / e.total)
        }
    });
}

// async function addResourceCos(src, tags, desc, onProgress, canvas){
//     var str = await tooler.urlToBase64(src);
//     var file = tooler.dataURLtoFile(str, "file.jpg");
//     var filename = Date.now() + "_" + Math.floor(Math.random() * 10000) + ".jpg";
//     await minUpload(src, canvas, filename, onProgress);
//     await cosTooler.putObject(file, filename, e => {
//         onProgress && onProgress(e.loaded / e.total);
//     });
//     let data = new FormData();
//     data.append('filename', filename);
//     data.append('tags', tags.join(","));
//     data.append('desc', desc);
//     return request.httpPost("/resource/cos/add", data, {
//         onUploadProgress: e => {
//             onProgress && onProgress(e.loaded / e.total)
//         }
//     });
// }

async function editResource(id, tags, desc, src, oldName, onProgress, canvas){
    let data = new FormData();
    data.append('id', id);
    data.append('tags', tags.join(","));
    data.append('desc', desc);
    if(src){
        var str = await tooler.urlToBase64(src);
        var filename = config.createName(false);
        await uploadMin(src, canvas, filename);
        var file = tooler.dataURLtoFile(str, filename);
        data.append('file', file);
        data.append('old', oldName);
    }
    return request.httpPost("/resource/edit", data, {
        onUploadProgress: e => {
            onProgress && onProgress(e.loaded / e.total)
        }
    });
}


// async function editResourceCos(id, tags, desc, src, oldName, onProgress, canvas){
//     let data = new FormData();
//     data.append('id', id);
//     data.append('tags', tags.join(","));
//     data.append('desc', desc);
//     if(src){
//         var str = await tooler.urlToBase64(src);
//         var file = tooler.dataURLtoFile(str, "file.jpg");
//         var filename = Date.now() + "_" + Math.floor(Math.random() * 10000) + ".jpg";
//         await minUpload(src, canvas, filename, onProgress);
//         await cosTooler.putObject(file, filename, e => {
//             onProgress && onProgress(e.loaded / e.total);
//         });
//         data.append('filename', filename);
//     }
//     return request.httpPost("/resource/cos/edit", data, {
//         onUploadProgress: e => {
//             onProgress && onProgress(e.loaded / e.total)
//         }
//     });
// }

// async function minUpload(url, canvas, filename, onProgress){
//     console.log("minUpload");
//     var file = await fileTooler.urlToFile(url, canvas, true);
//     if(file){
//         await cosTooler.putObject(file, config.minPath(filename), e => {
//             onProgress && onProgress(e.loaded / e.total);
//         });
//     }
// }

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
    // addResource: addResourceCos,
    // editResource: editResourceCos,
    getImages,
    getTags,
    deleteResources,
    addTag,
    search,
    getTotal
}