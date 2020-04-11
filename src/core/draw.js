import tooler from './tooler'

let canvas;
let ctx;
let img;
let maskWidth = 100;
let maskHeight = 100;
let canvasWidth;
let canvasHeight;
let x = 0;
let y = 0;
let pic;
let points = [];
let pointSize = 20;

let isMove = false;
let isDrag = false;
let dragName;
let offset;
let scale = 1;
let padding = 20;
let imgx = padding;
let imgy = padding;

async function init($canvas, $url, $pic, $offset){
    img = await tooler.getImage($url);
    pic = $pic;
    offset = $offset;
    canvas = $canvas;

    var sw = window.innerWidth;
    var sh = window.innerHeight - offset.y - 200;
    // var sh = window.innerWidth;

    if(img.width / img.height > (sw - padding) / (sh - padding)){
        scale = (sw - 2 * padding) / img.width;
        canvas.width = sw;
        canvas.height = img.height * scale + 2 * padding;
        imgx = padding;
    }
    else{
        scale = (sh - 2 * padding) / img.height;
        canvas.width = sw;
        canvas.height = sh;
        imgx = (sw - img.width * scale) / 2;
    }

    imgy = padding;
    
    ctx = canvas.getContext("2d");
    console.log(ctx);
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    console.log('canvas', canvasWidth, canvasHeight);
    x = (canvasWidth - maskWidth) / 2;
    y = (canvasHeight - maskHeight) / 2;
    initPoints();
    update();
    return img;
}

function initPoints(){
    points.push({
        name: 'LT'
    });
    points.push({
        name: 'CT'
    });
    points.push({
        name: 'RT'
    });
    points.push({
        name: 'LC'
    });
    points.push({
        name: 'RC'
    });
    points.push({
        name: 'LB'
    });
    points.push({
        name: 'CB'
    });
    points.push({
        name: 'RB'
    });
}

function getPosition($name){
    let position = {
        'LT': {
            x: x,
            y: y
        },
        'CT':{
            x: x + maskWidth / 2,
            y: y
        },
        'RT':{
            x: x + maskWidth,
            y: y
        },
        'LC': {
            x: x,
            y: y + maskHeight / 2
        },
        'RC': {
            x: x + maskWidth,
            y: y + maskHeight / 2
        },
        'LB': {
            x: x,
            y: y + maskHeight
        },
        'CB':{
            x: x + maskWidth / 2,
            y: y + maskHeight
        },
        'RB':{
            x: x + maskWidth,
            y: y + maskHeight
        },
    }
    return position[$name];
}

function updatePoints(){
    ctx.fillStyle = "#ffffff";
    let haveSize = pointSize / 2;
    
    points.forEach(point => {
        let obj = getPosition(point.name);
        ctx.fillRect(obj.x - haveSize, obj.y - haveSize, pointSize, pointSize);
    })
}

function start($x, $y){
    console.log("canvas", $x - offset.x, $y - offset.y);

    // let scale = canvasWidth / window.innerWidth;

    // $x = $x * scale;
    // $y = $y * scale;

    $x -= offset.x;
    $y -= offset.y;

    isMove = false;
    isDrag = false;
    let haveSize = pointSize / 1;

    points.forEach(point => {
        let obj = getPosition(point.name);
        if($x > obj.x - haveSize && $x < obj.x + haveSize){
            if($y > obj.y - haveSize && $y < obj.y + haveSize){
                console.log('drag');
                isDrag = true;
                dragName = point.name;
            }
        }
    });

    if(!isDrag){
        if($x > x && $x < x + maskWidth){
            if($y > y && $y < y + maskHeight){
                console.log('move');
                isMove = true;
            }
        }
    }
}

function nearPoint(){
    if(x < imgx){
        x = imgx;
    }
    else if(x + maskWidth > canvasWidth - imgx){
        x = canvasWidth - imgx - maskWidth;
    }
    if(y < imgy){
        y = imgy;
    }
    else if(y + maskHeight > canvasHeight - imgy){
        y = canvasHeight - imgy - maskHeight;
    }
}

function nearSize(){
    if(maskWidth < 0){
        maskWidth = 0;
    }
    if(maskHeight < 0){
        maskHeight = 0;
    }
    if(x + maskWidth > canvasWidth - imgx){
        maskWidth = canvasWidth - imgx - x;
    }
    if(y + maskHeight > canvasHeight - imgy){
        maskHeight = canvasHeight - imgy - y;
    }
}

function move($x, $y){
    if(isMove){
        console.log('move', $x, $y);
        x = x + $x;
        y = y + $y;
        nearPoint();
        update();
    }
    else if(isDrag){
        if(dragName == "RB"){
            maskWidth += $x;
            maskHeight += $y;

            nearSize();
            update();
        }
        else if(dragName == "RC"){
            maskWidth += $x;
            nearSize();

            update();
        }
        else if(dragName == "RT"){
            maskWidth += $x;
            maskHeight -= $y;
            nearSize();

            y += $y;
            nearPoint();
            update();
        }
        else if(dragName == "CT"){
            // maskWidth += $x;
            y += $y;
            nearPoint();
            maskHeight -= $y;
            nearSize();

            update();
        }
        else if(dragName == "LT"){
            maskWidth -= $x;
            maskHeight -= $y;
            nearSize();

            x += $x;
            y += $y;
            nearPoint();
            update();
        }
        else if(dragName == "LC"){
            maskWidth -= $x;
            nearSize();
            // maskHeight -= $y;
            x += $x;
            // y += $y;
            nearPoint();
            update();
        }
        else if(dragName == "LB"){
            maskWidth -= $x;
            maskHeight += $y;
            nearSize();
            x += $x;
            nearPoint();
            // y += $y;
            update();
        }
        else if(dragName == "CB"){
            // maskWidth -= $x;
            maskHeight += $y;
            nearSize();
            // x += $x;
            // y += $y;
            update();
        }

    }
}

function end(){
    if(isMove){
        update();
    }
    isDrag = false;
    isMove = false;
}

function update(){
    ctx.save();

    ctx.fillStyle = "#999999";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, 0, 0, img.width, img.height, imgx, imgy, canvasWidth - 2 * imgx, canvasHeight - 2 * imgy);

    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvasWidth, 0);
    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.lineTo(0, canvasHeight);
    ctx.closePath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + maskHeight);
    ctx.lineTo(x + maskWidth, y + maskHeight);
    ctx.lineTo(x + maskWidth, y);
    ctx.closePath();
    ctx.fill();

    ctx.globalAlpha = 1;
    updatePoints();

    ctx.restore();
}

function clip(){
    pic.width = maskWidth;
    pic.height = maskHeight;
    let ctx = pic.getContext("2d");
    var sx = (x - imgx) / scale;
    var sy = (y - imgy) / scale;
    ctx.drawImage(img, sx, sy, maskWidth / scale, maskHeight / scale, 0, 0, pic.width, pic.height);
    var dataUrl = pic.toDataURL('image/jpeg');
    return dataUrl;
}


export default {
    init,
    start,
    move,
    end,
    clip,
}
