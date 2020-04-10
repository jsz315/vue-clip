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
let startX = 0;
let startY = 0;
let startMaskWidth = 0;
let startMaskHeight = 0;
let pic;
let points = [];
let pointSize = 20;

let isMove = false;
let isDrag = false;
let dragName;

async function init($canvas, $url, $pic){
    img = await tooler.getImage($url);
    pic = $pic;
    canvas = $canvas;
    canvas.width = 1200;
    canvas.height = img.height * 1200 / img.width;
    
    ctx = canvas.getContext("2d");
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    console.log('canvas', canvasWidth, canvasHeight);
    x = (canvasWidth - maskWidth) / 2;
    y = (canvasHeight - maskHeight) / 2;
    startX = x;
    startY = y;
    startMaskWidth = maskWidth;
    startMaskHeight = maskHeight;
    initPoints();
    update();
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
    console.log("page", $x, $y);

    let scale = canvasWidth / window.innerWidth;

    $x = $x * scale;
    $y = $y * scale;
    console.log("canvas", $x, $y);

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

function move($x, $y){
    let scale = window.innerWidth / canvasWidth;
    $x = $x / scale;
    $y = $y / scale;

    if(isMove){
        console.log('move', $x, $y);
        x = x + $x;
        y = y + $y;
        update();
    }
    else if(isDrag){

        if(dragName == "RB"){
            maskWidth += $x;
            maskHeight += $y;
            update();
        }
        else if(dragName == "RC"){
            maskWidth += $x;
            update();
        }
        else if(dragName == "RT"){
            maskWidth += $x;
            maskHeight -= $y;
            y += $y;
            update();
        }
        else if(dragName == "CT"){
            // maskWidth += $x;
            maskHeight -= $y;
            y += $y;
            update();
        }
        else if(dragName == "LT"){
            maskWidth -= $x;
            maskHeight -= $y;
            x += $x;
            y += $y;
            update();
        }
        else if(dragName == "LC"){
            maskWidth -= $x;
            // maskHeight -= $y;
            x += $x;
            // y += $y;
            update();
        }
        else if(dragName == "LB"){
            maskWidth -= $x;
            maskHeight += $y;
            x += $x;
            // y += $y;
            update();
        }
        else if(dragName == "CB"){
            // maskWidth -= $x;
            maskHeight += $y;
            // x += $x;
            // y += $y;
            update();
        }

    }
}

function end(){
    if(isMove){
        startX = x;
        startY = y;
        startMaskWidth = maskWidth;
        startMaskHeight = maskHeight;
        update();
    }
    isDrag = false;
    isMove = false;
    
}

function scale($n){
    maskWidth = startMaskWidth * $n;
    maskHeight = startMaskHeight * $n;
    x = startX - (maskWidth - startMaskWidth) / 2;
    y = startY - (maskHeight - startMaskHeight) / 2;
    update();
}

function update(){
    ctx.save();

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasWidth, canvasHeight);

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
    ctx.drawImage(img, x, y, maskWidth, maskHeight, 0, 0, pic.width, pic.height);
    var dataUrl = pic.toDataURL('image/jpeg');
    return dataUrl;
}

function getBound(){
    return {
        x: x,
        y: y,
        width: maskWidth,
        height: maskHeight
    }
}

export default {
    init,
    start,
    move,
    end,
    scale,
    clip,
    getBound
}
