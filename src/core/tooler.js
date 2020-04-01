function getImage(url){
    return new Promise(resolve => {
        var img = new Image();
        img.onload = function(){
            resolve(img);
        }
        img.src = url;
    })
}

function checkMobile(){
    let list = ["Android", "iPhone", "iPad"];
    let res = list.find(item => {
        if(navigator.userAgent.indexOf(item) != -1){
            return true;
        }
    })
    return !!res;
}

function getElementPosition(element){
    var x = element.getBoundingClientRect().left;
    var y = element.getBoundingClientRect().top;
    return {x: x, y: y};
}


export default {
    getImage,
    checkMobile,
    getElementPosition
}