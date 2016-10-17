/**
 * Created by ZhangJikai on 2016/10/17.
 */
$(document).ready(function() {
    var beginPoint = {},
        stopPoint = {},
        polygonVertex = [],
        CONST = {
            edgeLen: 50,
            angle: 25
        };
    //封装的作图对象
    var Plot = {

        angle: "",

        //在CONST中定义的edgeLen以及angle参数
        //短距离画箭头的时候会出现箭头头部过大，修改：
        dynArrowSize: function() {
            var x = stopPoint.x - beginPoint.x,
                y = stopPoint.y - beginPoint.y,
                length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            if (length < 250) {
                CONST.edgeLen = CONST.edgeLen/2;
                CONST.angle = CONST.angle/2;
            }
            else if(length<500){
                CONST.edgeLen=CONST.edgeLen*length/500;
                CONST.angle=CONST.angle*length/500;
            }
            // console.log(length);
        },

        //getRadian 返回以起点与X轴之间的夹角角度值
        getRadian: function(beginPoint, stopPoint) {
            Plot.angle = Math.atan2(stopPoint.y - beginPoint.y, stopPoint.x - beginPoint.x) / Math.PI * 180;
            console.log(Plot.angle);
            paraDef(50,25);
            Plot.dynArrowSize();
        },

        ///获得箭头底边两个点
        arrowCoord: function(beginPoint, stopPoint) {
            polygonVertex[0] = beginPoint.x;
            polygonVertex[1] = beginPoint.y;
            polygonVertex[6] = stopPoint.x;
            polygonVertex[7] = stopPoint.y;
            Plot.getRadian(beginPoint, stopPoint);
            polygonVertex[8] = stopPoint.x - CONST.edgeLen * Math.cos(Math.PI / 180 * (Plot.angle + CONST.angle));
            polygonVertex[9] = stopPoint.y - CONST.edgeLen * Math.sin(Math.PI / 180 * (Plot.angle + CONST.angle));
            polygonVertex[4] = stopPoint.x - CONST.edgeLen * Math.cos(Math.PI / 180 * (Plot.angle - CONST.angle));
            polygonVertex[5] = stopPoint.y - CONST.edgeLen * Math.sin(Math.PI / 180 * (Plot.angle - CONST.angle));
        },

        //获取另两个底边侧面点
        sideCoord: function() {
            var midpoint = {};
            // midpoint.x = polygonVertex[6] - (CONST.edgeLen * Math.cos(Plot.angle * Math.PI / 180));
            // midpoint.y = polygonVertex[7] - (CONST.edgeLen * Math.sin(Plot.angle * Math.PI / 180));
            midpoint.x=(polygonVertex[4]+polygonVertex[8])/2;
            midpoint.y=(polygonVertex[5]+polygonVertex[9])/2;
            polygonVertex[2] = (polygonVertex[4] + midpoint.x) / 2;
            polygonVertex[3] = (polygonVertex[5] + midpoint.y) / 2;
            polygonVertex[10] = (polygonVertex[8] + midpoint.x) / 2;
            polygonVertex[11] = (polygonVertex[9] + midpoint.y) / 2;
        },

        //画箭头
        drawArrow: function() {
            var ctx;
            ctx = $(".drawArrow")[0].getContext('2d');
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.moveTo(polygonVertex[0], polygonVertex[1]);
            ctx.lineTo(polygonVertex[2], polygonVertex[3]);
            ctx.lineTo(polygonVertex[4], polygonVertex[5]);
            ctx.lineTo(polygonVertex[6], polygonVertex[7]);
            ctx.lineTo(polygonVertex[8], polygonVertex[9]);
            ctx.lineTo(polygonVertex[10], polygonVertex[11]);
            // ctx.lineTo(polygonVertex[0], polygonVertex[1]);
            ctx.closePath();
            ctx.fill();
        }
    };

    //记录起点beginPoint
    $(".drawArrow").mousedown(function(e) {
        beginPoint.x = e.pageX;
        beginPoint.y = e.pageY;
        // alert(beginPoint.x+"+"+beginPoint.y);
    });

    //记录终点stopPoint，绘图
    $(".drawArrow").mouseup(function(e) {
        stopPoint.x = e.pageX;
        stopPoint.y = e.pageY;
        // alert(stopPoint.x+"+"+stopPoint.y);
        Plot.arrowCoord(beginPoint, stopPoint);
        Plot.sideCoord();
        Plot.drawArrow();
    });

    //自定义参数
    function paraDef(edgeLen, angle) {
        CONST.edgeLen = edgeLen;
        CONST.angle = angle;
    }

    // $(".para-def").click(function() {
    //     var edgeLen,
    //         angle;
    //     edgeLen = parseInt($(".edge-len").val());
    //     angle = parseInt($(".angle").val());
    //     paraDef(edgeLen, angle);
    // });

});