function getImage(url) {
    return new Promise(resolve => {
        var img = new Image();
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

function addListener(target, type, callback){
    target.addEventListener(type, callback);
    return {
        destroy() {
            target.removeEventListener(type, callback);
        }
    };
}

export default {
    getImage,
    checkMobile,
    getElementPosition,
    dataURLtoFile,
    addListener
}