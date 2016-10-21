/**
 * Created by ZhangJikai on 2016/10/17.
 */
Gips.arrow = {
    angle: "",

    beginPoint: {},

    stopPoint: {},

    polygonVertex: [],

    context: null,

    fillColor: "#aaa",

    initContext: function () {
        var canvas = document.getElementById("canvas");
        this.context = canvas.getContext("2d");
    },

    CONST: {
        edgeLen: 20,
        angle: 10
    },

    setPoint: function (beginPoint, stopPoint) {
        this.beginPoint = beginPoint;
        this.stopPoint = stopPoint;
    },

    dynArrowSize: function () {
        var x = this.stopPoint.x - this.beginPoint.x,
            y = this.stopPoint.y - this.beginPoint.y,
            length = Math.floor(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
        console.log("length: " + length);
        /*if (length < 250) {
            /!*console.log("除了");*!/
            this.CONST.edgeLen = Math.floor(this.CONST.edgeLen / 2);
            this.CONST.angle = Math.floor(this.CONST.angle / 2);
        }*/
        /*else {
            this.CONST.edgeLen = Math.floor(this.CONST.edgeLen * length / 500);
            this.CONST.angle = Math.floor(this.CONST.angle * length / 500);
        }*/
    },

    //getRadian 返回以起点与X轴之间的夹角角度值
    getRadian: function (beginPoint, stopPoint) {
        this.angle = Math.atan2(stopPoint.y - beginPoint.y, stopPoint.x - beginPoint.x) / Math.PI * 180;
        //console.log(Plot.angle);
        this.beginPoint = beginPoint;
        this.stopPoint = stopPoint;
        this.CONST = {
            edgeLen: 20,
            angle: 16
        }
        this.dynArrowSize();
    },

    ///获得箭头底边两个点
    arrowCoord: function (beginPoint, stopPoint) {
        this.polygonVertex[0] = beginPoint.x;
        this.polygonVertex[1] = beginPoint.y;
        this.polygonVertex[6] = stopPoint.x;
        this.polygonVertex[7] = stopPoint.y;
        this.getRadian(beginPoint, stopPoint);
        this.polygonVertex[8] = Math.floor(stopPoint.x - this.CONST.edgeLen * Math.cos(Math.PI / 180 * (this.angle + this.CONST.angle)));
        this.polygonVertex[9] = Math.floor(stopPoint.y - this.CONST.edgeLen * Math.sin(Math.PI / 180 * (this.angle + this.CONST.angle)));
        this.polygonVertex[4] = Math.floor(stopPoint.x - this.CONST.edgeLen * Math.cos(Math.PI / 180 * (this.angle - this.CONST.angle)));
        this.polygonVertex[5] = Math.floor(stopPoint.y - this.CONST.edgeLen * Math.sin(Math.PI / 180 * (this.angle - this.CONST.angle)));
    },

    //获取另两个底边侧面点
    sideCoord: function () {
        var midpoint = {};
        // midpoint.x = polygonVertex[6] - (CONST.edgeLen * Math.cos(Plot.angle * Math.PI / 180));
        // midpoint.y = polygonVertex[7] - (CONST.edgeLen * Math.sin(Plot.angle * Math.PI / 180));
        midpoint.x = Math.floor((this.polygonVertex[4] + this.polygonVertex[8]) / 2);
        midpoint.y = Math.floor((this.polygonVertex[5] + this.polygonVertex[9]) / 2);
        this.polygonVertex[2] = Math.floor((this.polygonVertex[4] + midpoint.x) / 2);
        this.polygonVertex[3] = Math.floor((this.polygonVertex[5] + midpoint.y) / 2);
        this.polygonVertex[10] = Math.floor((this.polygonVertex[8] + midpoint.x) / 2);
        this.polygonVertex[11] = Math.floor((this.polygonVertex[9] + midpoint.y) / 2);
    },

    //画箭头
    drawArrow: function () {

        /*context = $(".drawArrow")[0].getContext('2d');
         context.fillStyle = "red";*/
        /*this.context.save();*/
        /*this.context.strokeStyle = "green";*/
        /* this.context.fillStyle = this.fillColor;*/
        this.context.beginPath();
        this.context.moveTo(this.polygonVertex[0], this.polygonVertex[1]);
        this.context.lineTo(this.polygonVertex[2], this.polygonVertex[3]);
        this.context.lineTo(this.polygonVertex[4], this.polygonVertex[5]);
        this.context.lineTo(this.polygonVertex[6], this.polygonVertex[7]);
        this.context.lineTo(this.polygonVertex[8], this.polygonVertex[9]);
        this.context.lineTo(this.polygonVertex[10], this.polygonVertex[11]);
        // ctx.lineTo(polygonVertex[0], polygonVertex[1]);
        this.context.closePath();
        this.context.fill();
        /*this.context.restore();*/
    }


}
