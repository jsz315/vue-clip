function getImage(url) {
    return new Promise(resolve => {
        var img = new Image();
        // img.setAttribute("crossOrigin",'Anonymous');
        img.crossOrigin = "";
        console.log(img.crossOrigin, "img.crossOrigin");
        img.onload = function () {
            resolve(img);
        }
        img.src = url;
    })
}

function checkMobile() {
    let list = ["Android", "iPhone", "iPad"];
    let res = list.find(item => {
        if (navigator.userAgent.indexOf(item) != -1) {
            return true;
        }
    })
    return !!res;
}

function getElementPosition(element) {
    var x = element.getBoundingClientRect().left;
    var y = element.getBoundingClientRect().top;
    return {
        x: x,
        y: y
    };
}

async function urlToBase64(url) {
    //本地跨域已解决
    var img = await getImage(url);
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
}

function dataURLtoFile(dataurl, filename) {
    //本地跨域已解决
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
        type: mime
    });
}

function sleep(time){
    return new Promise(resolve=>{
        setTimeout(() => {
            resolve();
        }, time);
    })
}

function isEmpty(str){
    return str.replace(/(^s*)|(s*$)/g, "").length == 0
} 


let timerId = 0;
const throttle = (fn, time = 300)=>{
    if(timerId == 0){
        timerId = 1;
        fn.apply(this);
        setTimeout(() => {
            if(timerId > 1){
                console.log("执行忽略期间再次调用");
                fn.apply(this);
            }
            timerId = 0;
        }, time);
    }
    else{
        console.log("忽略此次执行", timerId++);
    }
}

export default {
    getImage,
    checkMobile,
    getElementPosition,
    dataURLtoFile,
    urlToBase64,
    sleep,
    isEmpty,
    throttle
}