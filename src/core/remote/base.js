import request from '../request'

class base {
    constructor(){
        console.log("base")
    }

    say(str){
        console.log("say: " + str);
    }

    t1(){
        console.log("base t1");
    }

    t3(){
        console.log("base t3");
    }

    t4(){
        this.say("ddd")
    }

    async getImages(page, size){
        return request.httpGet('/resource/imgs', {page, size});
    }
    
    async getTags(){
        return request.httpGet('/resource/allTags');
    }
    
    async getTotal(){
        return request.httpGet('/resource/total');
    }

    async deleteResources(list){
        let data = new FormData();
        data.append('list', JSON.stringify(list));
        return request.httpPost("/resource/delete", data);
    }
    
    async addTag(tag){
        return request.httpGet("/resource/addTag", {tag});
    }
    
    async search(param){
        return request.httpGet("/resource/search", param);
    }
}

export default base;