let canvas;
let ctx;
let canvasWidth;
let canvasHeight;
let paths = [];

function init($canvas, $width, $height){
    canvas = $canvas;
    canvas.width = $width;
    canvas.height = $height;
    ctx = canvas.getContext("2d");
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    update();
}

function add($bound){
    var path = getPathFromBound($bound);
    paths.push(path);
    update();
}

function update(){
    ctx.save();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    console.log('update')
    paths.forEach((path, index) => {
        ctx.strokeStyle = "#ff9900";
        ctx.fillStyle = index == 0 ? "#ff0000" : "#009900";
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        for(var i = 0; i < path.length; i++){
            var p = path[i];
            if(i == 0){
                ctx.moveTo(p.x, p.y);
            }
            else{
                ctx.lineTo(p.x, p.y);
            }
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    })
    ctx.restore();
}

function getPathFromBound($bound){
    var path = [];
    path.push({x: $bound.x, y: $bound.y});
    path.push({x: $bound.x + $bound.width, y: $bound.y});
    path.push({x: $bound.x + $bound.width, y: $bound.y + $bound.height});
    path.push({x: $bound.x, y: $bound.y + $bound.height});
    return path;
}

function draw(){

}

function compute(){
    var res = window.compute(paths, [[]], 1);
    console.log(res);
    res.forEach((path, index) => {
        console.log(index);
        var bound = window.ClipperLib.JS.BoundsOfPath(path, 1);
        console.log(bound);
    })

    var str = JSON.stringify(res);
    str = str.replace(/X/g, 'x');
    str = str.replace(/Y/g, 'y');
    paths = JSON.parse(str);
    update();
}

export default {
    init,
    draw,
    add,
    compute
}
