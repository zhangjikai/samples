/**
 * Created by ZhangJikai on 2016/10/17.
 */


Gips.DrawArea = function (parameters) {
    this.charts = new Array();
    this.maxLevel = 0;
    this.levelChartNum = new HashMap();
    this.chartScopes = null;
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
};

Gips.DrawArea.prototype.addChart = function (chart) {
    chart.chartId = this.charts.length;
    this.charts.push(chart);

    if (chart.level > this.maxLevel) {
        this.maxLevel = chart.level;
    }
    if (this.levelChartNum.has(chart.level)) {
        var num = this.levelChartNum.get(chart.level);
        this.levelChartNum.set(chart.level, num + 1);
        chart.xIndex = num;
    } else {
        chart.xIndex = 0;
        this.levelChartNum.set(chart.level, 1);
    }
};

Gips.DrawArea.prototype.initCanvasWH = function () {
    var heightRatio = Gips.config.chartHeightRatio;
    this.canvasWidth = parseInt($("#chart_panel").width() - 10);
    this.canvasHeight = parseInt($(window).height() * heightRatio);
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
};

Gips.DrawArea.prototype.fitChart = function () {
    var i, chartNum, singleWidth, singleHeight;
    singleHeight = parseInt(this.canvasHeight / (this.maxLevel + 1));
    this.chartScopes = new HashMap();
    for (i = 0; i < (this.maxLevel + 1); i++) {
        chartNum = this.levelChartNum.get(i);
        singleWidth = parseInt(this.canvasWidth / chartNum);
        this.chartScopes.set(i, {width: singleWidth, height: singleHeight});
    }
};


Gips.DrawArea.prototype.drawArrow = function() {
    this.context.save();
    this.context.fillStyle = Gips.arrow.fillColor;
    var that = this;
    this.charts.forEach(function(chart) {
        var parentChart, beginPoint, stopPoint;

        console.log( "parentId" + chart.parentId);

        if(chart.parentId != -1) {
            //console.log(that.charts);
            parentChart = that.charts[chart.parentId];
            //console.log(chart.parentChartId);
            //console.log("parentChartId: " + chart.parentChartId);
           // console.log("parentChart" + parentChart);
            beginPoint = {
                x: Math.floor((parentChart.range.xStart + parentChart.range.xEnd) / 2),
                y: Math.floor((parentChart.range.yEnd - chart.ySpace * 2 / 3))
            };
            stopPoint = {
                x: Math.floor((chart.range.xStart + chart.range.xEnd) / 2),
                y :Math.floor((chart.range.yStart + chart.ySpace * 2 / 3))
            };
            Gips.arrow.arrowCoord(beginPoint, stopPoint);
            Gips.arrow.sideCoord();
            Gips.arrow.drawArrow();

        }

    });
    this.context.restore();
};

Gips.DrawArea.prototype.draw = function() {

    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.charts.forEach(function(chart) {
        chart.setScope();
        chart.draw();
        //console.log(chart);
    });
    this.drawArrow();
};



Gips.DrawArea.prototype.addListener = function() {
    var canvas = this.canvas;
    var charts = this.charts;
    var that = this;
    this.canvas.onclick = function(e) {

        var i;
        var point = Gips.helper.windowToCanvas(canvas, e.clientX, e.clientY);
        var chartId = -1;
        var chart;
        for(i = 0; i < charts.length; i++) {
            chart = charts[i];
            if(chart.hasPoint(point.x, point.y)) {
                chartId = chart.chartId;
                break;
            }
        }

        if(chartId == -1) {
            return;
        }

        console.log("chartId: " + chartId);
        var newChart = new Gips.Chart({
            level: chart.level + 1,
            canvas: that.canvas,
            context: that.context,
            drawArea: that,
            parentId: chartId
        });


        newChart.initData();
        that.addChart(newChart);
        that.fitChart();
        that.draw();
    }
};


