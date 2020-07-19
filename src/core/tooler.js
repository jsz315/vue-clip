function getImage(url) {
    return new Promise(resolve => {
        var img = new Image();
        img.setAttribute("crossOrigin",'Anonymous');
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

export default {
    getImage,
    checkMobile,
    getElementPosition,
    dataURLtoFile,
    urlToBase64,
    sleep,
    isEmpty
}