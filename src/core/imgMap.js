//url: num 图片下载进度集合
const map = {};

function load(url){
    if(map[url] == 100){
        return;
    }
    var img = new Image();
    img.onload = function(){
        console.log("onload");
    };
    img.onprogress= function(e){
        console.log(e, "onprogress");
    }
    img.src = url;
}

function start(url, callback){
    if(map[url] == 100){
        callback(100);
        return;
    }

    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url, true);
    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function() {
        // var blob = new Blob([this.response]);
        // var link = window.URL.createObjectURL(blob);
        // console.log(link);
        callback(100);
    };
    xmlHTTP.onprogress = function(e) {
        var num = parseInt((e.loaded / e.total) * 100);
        console.log(num, "onprogress");
        callback(num);
    };
    xmlHTTP.onloadstart = function() {
        // thisImg.completedPercentage = 0;
        console.log(0, "onloadstart");
        callback(0);
    };
    xmlHTTP.send();
}

export default {load, start}