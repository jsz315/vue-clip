const maxSize = 180;

function urlToFile(url, canvas, scale, filename) {
    //本地跨域已解决
    return new Promise(resolve => {
        var image = new Image();
        // 给img加上随机值一部分情况下能解决跨域
        // image.src = img + '?time=' + new Date().valueOf();
        image.src = url;
        // 允许跨域操作
        image.setAttribute("crossOrigin", '');
        image.onload = function () {
            var base64 = getBase64Image(image, canvas, scale);
            var file = dataURLtoFile(base64, filename);
            resolve(file);
        }
        image.onerror = function(e){
            console.log(e);
            resolve(false);
        }
    })
}
// 将url转换为base64
function getBase64Image(img, canvas, scale) {
    var ctx = canvas.getContext("2d");
    if(scale){
        var sw, sh;
        if(img.width > img.height){
            sw = maxSize;
            sh = maxSize / img.width * img.height;
        }
        else{
            sh = maxSize;
            sw = maxSize / img.height * img.width;
        }
        canvas.width = sw;
        canvas.height = sh;
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, sw, sh); 
    }
    else{
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
    }
    
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/" + ext);
    return {
        dataURL: dataURL,
        type: "image/" + ext
    };
}
// // 将url转换为blob
// function convertBase64UrlToBlob(base64) {
//     var urlData = base64.dataURL;
//     var type = base64.type;
//     var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte
//     //处理异常,将ascii码小于0的转换为大于0  
//     var ab = new ArrayBuffer(bytes.length);
//     var ia = new Uint8Array(ab);
//     for (var i = 0; i < bytes.length; i++) {
//         ia[i] = bytes.charCodeAt(i);
//     }
//     return new Blob([ab], { type: type });
// }

//将base64转换为file文件
function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

// function checkImgExists(url) {  
//     var image = new Image(); //判断图片是否存在  
//     image.src = url;  
//     //没有图片，则返回-1  
//     if (image.fileSize > 0 || (image.width > 0 && image.height > 0)) {  
//         return true;  
//     } else {  
//         return false;
//     }  
// } 


function validateLink(url){
    return new Promise(resolve => {
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", url, true);
        xhr.onreadystatechange = ()=>{
            // console.log(`readyState = ${xhr.readyState} ; status = ${xhr.status}`);
            if(xhr.readyState === 4){
                if(xhr.status === 404){
                    console.log("文件不存在：" + url);
                    resolve(false);
                }
                if(xhr.status === 200){
                    console.log("文件存在：" + url);
                    resolve(true);
                }
            }
        }
        xhr.send();
    })
}

export default {
    urlToFile,
    validateLink
}