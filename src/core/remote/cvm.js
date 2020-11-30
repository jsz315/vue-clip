import base from './base';
import tooler from '../tooler'
import config from '../config'
import request from '../request'
import fileTooler from '../fileTooler'

class cvm extends base{
    constructor(){
        super();
    }

    t1(){
        console.log("cvm t1");
    }

    t2(){
        console.log("cvm t2");
    }

    async uploadMin(src, canvas, filename, onProgress){
        var file = await fileTooler.urlToFile(src, canvas, true, filename.replace(".", "_min."));
        let data = new FormData();
        data.append('file', file);
        return request.httpPost("/resource/min", data, {
            onUploadProgress: e => {
                onProgress && onProgress(e.loaded / e.total)
            }
        });
    }

    async addResource(src, tags, desc, onProgress, canvas){
        var str = await tooler.urlToBase64(src);
        var filename = config.createName(false);
        await this.uploadMin(src, canvas, filename);
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

    
    async editResource(id, tags, desc, src, oldName, onProgress, canvas){
        let data = new FormData();
        data.append('id', id);
        data.append('tags', tags.join(","));
        data.append('desc', desc);
        if(src){
            var str = await tooler.urlToBase64(src);
            var filename = config.createName(false);
            await this.uploadMin(src, canvas, filename);
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
}


export default cvm;