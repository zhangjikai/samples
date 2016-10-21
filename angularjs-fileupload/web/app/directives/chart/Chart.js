/**
 * Created by ZhangJikai on 2016/10/13.
 */

Gips.Chart = function (parameters) {
    /*this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;*/

    this.canvas = parameters.canvas || null;
    this.context = parameters.context || null;
    this.canvasWidth = parameters.canvasWidth || 0;
    this.canvasHeight = parameters.canvasHeight || 0;
    this.drawArea = parameters.drawArea || null;
    // 质谱级别
    this.level = parameters.level || 0;
    // 在x轴方向上的索引
    this.xIndex = parameters.xIndex || 0;

    // 当前图表的范围
    this.range = parameters.range || {};

    /*this.parentId = parameters.parentId || -1;*/
    /*if(parameters.parentId == 0) {
        this.parentId = 0;
    } else {
        this.parentId = -1;
    }*/

    if(parameters.parentId === undefined) {
        this.parentId = -1;
    } else {
        this.parentId = parameters.parentId;
    }

    // 总体的索引
    this.chartId = parameters.chartId || 0;

    this.scopeStartX = parameters.scopeStartX || 0;
    this.scopeStartY = parameters.scopeStartY || 0;

    // 图标数据
    this.chartData = null;

    // 坐标区域的最大最小值
    this.maxX = 0;
    this.maxY = 0;
    this.minX = 0;
    this.minY = 0;
    // 坐标值的最大最小值
    this.coMaxX = 0;
    this.coMaxY = 0;
    this.coMinx = 0;
    this.coMinY = 0;

    // 单位坐标区域或者坐标的值
    this.unitCoWidthX = 0;
    this.unitCoWidthY = 0;
    this.unitCoNumX = 0;
    this.unitCoNumY = 0;

    parameters = parameters || {};
    this.fontSize = parameters.fontSize || 12;
    this.caliSpace = parameters.caliSpace || 5;
    this.caliNumX = parameters.caliNumX || 20;
    this.caliNumY = parameters.caliNumY || 10;
    this.caliLen = parameters.caliLen || 10;
    this.xSpace = parameters.xSpace || 60;
    this.ySpace = parameters.ySpace || 40;
};

/*Gips.Chart.prototype.initCanvasWH = function () {
    var heightRatio = Gips.Config.chartHeightRatio;
    /!*this.canvasWidth = parseInt($(window).width() - 20);*!/
    this.chartWidth = parseInt($("#chart_panel").width() - 10);
    this.chartHeight = parseInt($(window).height() * heightRatio);
    this.canvas.width = this.chartWidth;
    this.canvas.height = this.chartHeight;
};*/

Gips.Chart.prototype.setChartData = function (chartData) {
    this.chartData = chartData;

};

Gips.Chart.prototype.setValues = function(parameters) {
    parameters = parameters || {};
    this.canvas = parameters.canvas || this.canvas;
    this.context = parameters.context || this.context;
    this.canvasWidth = parameters.canvasWidth || this.canvasWidth;
    this.canvasHeight = parameters.canvasHeight || this.canvasHeight;
    this.drawArea = parameters.drawArea || this.drawArea;

};

Gips.Chart.prototype.setScope = function() {
    // console.log(this.drawArea.chartScopes);
    var scope = this.drawArea.chartScopes.get(this.level);
    // console.log(scope);
    this.canvasWidth = scope.width;
    this.canvasHeight = scope.height;
    this.scopeStartX = scope.width * this.xIndex;
    this.scopeStartY = scope.height * this.level;
    this.range.xStart = this.scopeStartX;
    this.range.xEnd = this.scopeStartX + this.canvasWidth;
    this.range.yStart = this.scopeStartY;
    this.range.yEnd = this.scopeStartY + this.canvasHeight;
};

Gips.Chart.prototype.hasPoint = function(x, y) {
    if(this.range.xStart < x  && this.range.xEnd > x && this.range.yStart < y && this.range.yEnd > y) {
        return true;
    }
    return false;
};

/*Gips.Chart.setScope = function( chartWidth, chartHeight, drawArea) {
    this.canvas = canvas;
    this.context = context;
    this.chartWidth = chartWidth;
    this.chartHeight = chartHeight;
    this.drawArea = drawArea;
};*/

Gips.Chart.prototype.initData = function() {
    var url = Gips.config.localServerUrl + "/getData";
    //url = Gips.config.remoteServerUrl + "/getData";
    //Gips.config.serverUrl();
    var chartData;
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        success: function (data) {
            /*this.chartData = data;*/
            chartData = data;
        }

    });
    this.chartData = chartData;

    this.getMaxAndMin();
    this.getCoValues();

    //console.log(da);
    //console.log(this.chartData);
};

Gips.Chart.prototype.draw = function() {
    this.drawCoordinate();
    this.drawCalibration();
    //this.drawCaliText();
    this.drawChart();
}

Gips.Chart.prototype.drawCoordinate = function () {

    this.context.beginPath();
    this.context.lineWidth = 1;
    this.context.strokeStyle = "blue";
    this.context.moveTo(this.scopeStartX + this.xSpace, this.scopeStartY + this.ySpace);
    this.context.lineTo(this.scopeStartX + this.xSpace, this.scopeStartY + this.canvasHeight - this.ySpace);
    this.context.lineTo(this.scopeStartX + this.canvasWidth - this.xSpace, this.scopeStartY + this.canvasHeight - this.ySpace);
    this.context.stroke();
};

Gips.Chart.prototype.drawCalibration = function () {
    this.context.beginPath();
    this.context.strokeStyle = "#2c6698";
    this.unitCoWidthX = parseInt((this.canvasWidth - this.xSpace * 2) / (this.caliNumX + 0.5));
    this.unitCoWidthY = parseInt((this.canvasHeight - this.ySpace * 2) / (this.caliNumY + 0.5));
    var startX = this.scopeStartX + this.xSpace;
    var startY = this.scopeStartY + this.canvasHeight - this.ySpace;
    for (var i = 0; i < this.caliNumX; i++) {
        this.context.moveTo(startX + this.unitCoWidthX * (i + 1), startY);
        this.context.lineTo(startX + this.unitCoWidthX * (i + 1), startY - this.caliLen);
    }
    this.context.stroke();

    startX = this.scopeStartX + this.xSpace;
    startY = this.scopeStartY + this.canvasHeight - this.ySpace;
    for (var i = 0; i < this.caliNumY; i++) {
        this.context.moveTo(startX, startY - this.unitCoWidthY * (i + 1));
        this.context.lineTo(startX + this.caliLen, startY - this.unitCoWidthY * (i + 1));
    }
    this.context.stroke();
};

Gips.Chart.prototype.drawCaliText = function () {
    this.context.fillStyle = "#666";
    this.unitCoNumX = parseInt((this.coMaxX + this.caliNumX - this.coMinX) / this.caliNumX);

    this.unitCoNumY = this.coMaxY / this.caliNumY;
    this.unitCoNumY = this.getNearInteger(parseInt(this.unitCoNumY));

    this.context.font = "bold " + this.fontSize + "px Arial";
    this.context.textBaseline = "center";

    var text, textWidth;

    var startX = this.scopeStartX + this.xSpace - this.caliSpace;
    var startY = this.scopeStartY + this.canvasHeight - this.ySpace + parseInt(this.fontSize / 3);
    for (var i = 0; i <= this.caliNumY; i++) {
        text = this.unitCoNumY * i;
        textWidth = this.context.measureText(text).width;
        this.context.fillText(text, startX - textWidth, startY - this.unitCoWidthY * i);

    }

    startX = this.scopeStartX + this.xSpace;
    startY = this.scopeStartY + this.canvasHeight - this.ySpace + this.fontSize + this.caliSpace;
    //console.log(this.caliSpace);
    for (i = 0; i <= this.caliNumX; i++) {
        text = this.unitCoNumX * i + this.coMinX;
        textWidth = this.context.measureText(text).width;
        this.context.fillText(text, startX + this.unitCoWidthX * i - parseInt(textWidth / 2), startY);
    }
};

Gips.Chart.prototype.drawChart = function () {
    var cData;
    var realX, realY;
    var startY = this.scopeStartY + this.canvasHeight - this.ySpace;
    this.context.beginPath();
    this.context.strokeStyle = "#000";

    this.unitCoNumX = parseInt((this.coMaxX + this.caliNumX - this.coMinX) / this.caliNumX);

    this.unitCoNumY = this.coMaxY / this.caliNumY;
    this.unitCoNumY = this.getNearInteger(parseInt(this.unitCoNumY));

    var xBase = this.coMinX * this.unitCoWidthX / this.unitCoNumX - this.xSpace;

    for (var i = 0; i < this.chartData.length; i++) {
        cData = this.chartData[i];
        realX = cData.x * this.unitCoWidthX / this.unitCoNumX - xBase;
        realY = cData.y * this.unitCoWidthY / this.unitCoNumY;
        this.context.moveTo(this.scopeStartX + realX, startY);
        this.context.lineTo(this.scopeStartX + realX, startY - realY);
    }
    this.context.stroke();
};

Gips.Chart.prototype.getNearInteger = function (num) {
    if (num > 10 && num < 100) {
        while ((++num % 10)) {
        }
    } else if (num < 1000) {
        while ((++num % 100)) {
        }
    } else if (num < 10000) {
        while ((++num) % 1000) {
        }
    } else if (num < 100000) {
        while ((++num) % 10000) {
        }
    }
    return num;
};

Gips.Chart.prototype.getCoValues = function () {
    this.coMaxX = parseInt(this.maxX) + 10;
    this.coMaxY = parseInt(this.maxY) + 10;
    this.coMinX = parseInt(this.minX);
    this.coMinY = parseInt(this.minY);
    while ((++this.coMaxX) % 10) {
    }
    while ((++this.coMaxY) % 10) {
    }
    while ((--this.coMinX) % 10) {
    }
    while ((--this.coMinY) % 10) {
    }
};

Gips.Chart.prototype.getMaxAndMin = function () {
    this.maxX = 0;
    this.maxY = 0;
    this.minX = this.chartData[0].x;
    this.minY = this.chartData[0].y;
    for (var i = 0; i < this.chartData.length; i++) {
        var cData = this.chartData[i];
        cData.x = parseFloat(cData.x);
        cData.y = parseFloat(cData.y);

        if (cData.x > this.maxX) {
            this.maxX = cData.x;
        }
        if (cData.y > this.maxY) {
            this.maxY = cData.y;
        }
        if (cData.x < this.minX) {
            this.minX = cData.x;
        }
        if (cData.y < this.minY) {
            this.minY = cData.y;
        }
    }

}
