/**
 * 多个形状的计算
 * a  二维数组,格式如：[ Array ] Array是Point列表
 * b  二维数组,格式如：[ Array, Array, Array ] Array是Point列表
 * t  整数类型，运算类型，取值范围： 0 交集； 1 并集； 2 差集
 * 返回数组,格式如： [ Array... ] Array为对象{"X":800,"Y":500}列表（X, Y为大写），第一个Array为轮廓数据，后面Array的为挖洞数据
 * 例如：
 * [[{"X":900,"Y":800},{"X":500,"Y":800},{"X":500,"Y":500},{"X":800,"Y":500}],[{"X":600,"Y":600},{"X":800,"Y":700},{"X":800,"Y":600}]]
 * Array个数为计算结果后多边形的个数
 **/
function compute(a, b, t) {
    var subj = changePath(a);
    var clip = changePath(b);

    var start = subj[0];

    console.log("subj");
    console.log(subj);

    console.log("clip");
    console.log(clip);

    var solution = new ClipperLib.Paths();
    var c = new ClipperLib.Clipper();
    c.AddPaths(subj, ClipperLib.PolyType.ptSubject, true);
    c.AddPaths(clip, ClipperLib.PolyType.ptClip, true);
    c.Execute(t, solution, 1, 1);

    console.log("solution");
    console.log(solution);
    return solution;
}

/**
 * 求多个形状的并集
 * list  二维数组,格式如：[ Array ] Array是Point列表
 * 返回数组,格式如： [ Array... ] Array为对象{"X":800,"Y":500}列表（X, Y为大写）
 * Array个数为计算结果后多边形的个数
 **/
function joinAll(list) {
    var subj = changePath(list);
    console.log("subj");
    console.log(subj);

    var solution = new ClipperLib.Paths();
    var c = new ClipperLib.Clipper();
    c.AddPaths(subj, ClipperLib.PolyType.ptSubject, true);
    c.Execute(1, solution, 1, 1);

    console.log("solution");
    console.log(solution);
    return solution;
}


/**
 * 数据转换
 **/
function changePath(list) {
    var aim = [];
    if (list && list.length) {
        if (Object.prototype.toString.call(list[0]) == '[object Array]') {
            aim = list;
        } else {
            aim.push(list);
        }
    } else {
        return null;
    }

    var pots = [];
    for (var i = 0; i < aim.length; i++) {
        var list = [];
        for(var j = 0; j < aim[i].length; j++){
            list.push({
                X: aim[i][j].x,
                Y: aim[i][j].y
            })
        }

        var t = list;
        var dir = isClockwise(t);
        if (dir) {
            console.log("顺时针");
        } else {
            console.log("逆时针");
            t.reverse();
        }
        pots.push(t);
    }

    return pots;
}

// 多边形的点两两构成一个矢量，每两个矢量构成一个角度，其右侧的角度为矢量顺时针方向的角度，
// 我们通过计算所有的矢量两两构成的这个顺时针角度的和是否等于多边形内角和(n-2)*180，
// 如果等于，则说明矢量的顺时针方向角是多边形内角，说明矢量前进方向是顺时针，
// 否则，则是逆时针，此时计算出来的角度和应为n*180+多边形外交和360。
// 计算过程存在小数点误差，因此判断相等时使用一个范围。
function isClockwise(coords) {
    //角度和
    var angSum = 0;
    for (var i = 0; i < coords.length; i++) {
        var c1, c2, c3;
        if (i == 0) {
            c1 = coords[coords.length - 1];
            c2 = coords[i];
            c3 = coords[i + 1];
        } else if (i == coords.length - 1) {
            c1 = coords[i - 1];
            c2 = coords[i];
            c3 = coords[0];
        } else {
            c1 = coords[i - 1];
            c2 = coords[i];
            c3 = coords[i + 1];
        }
        var x1, y1, x2, y2, x3, y3;

        x1 = c1.X;
        y1 = c1.Y;
        x2 = c2.X;
        y2 = c2.Y;
        x3 = c3.X;
        y3 = c3.Y;

        var angRight = getCoordAngRight(x1, y1, x2, y2, x3, y3);
        angSum += angRight;
    }
    var isShunshizhen = Math.abs(angSum - (coords.length - 2) * 180);
    //涉及到平方和开方计算，因此结果与理论值会有一点偏差，所以使用一个容差值
    return isShunshizhen < coords.length;
}

// 计算两矢量所成的右侧角
function getCoordAngRight(x1, y1, x2, y2, x3, y3) {
    // 要先判断是左转还是右转，如果是右转，右侧角=夹角，如果是左转，右侧角=360-夹角
    var s = ((x1 - x3) * (y2 - y3) - (x2 - x3) * (y1 - y3));
    var len12 = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    var len23 = Math.sqrt(Math.pow(x2 - x3, 2) + Math.pow(y2 - y3, 2));
    var len13 = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2));
    var cos2 = (Math.pow(len23, 2) + Math.pow(len12, 2) - Math.pow(len13, 2)) / (2 * len12 * len23);
    var angle2 = Math.round(Math.acos(cos2) * 180 / Math.PI);
    if (s < 0) {
        //顺时针
        return angle2;
    } else if (s > 0) {
        //逆时针
        return 360 - angle2;
    } else {
        //平行
        return 360;
    }
}

function getFirst(){

}