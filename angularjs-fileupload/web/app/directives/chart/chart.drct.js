/**
 * Created by ZhangJikai on 2016/10/13.
 */
angular.module('app.core').directive('chartDrct', function ($http) {

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function ($scope, $element, $attr, $ngModel) {

            /*var chart = new Gips.Chart();
             chart.initCanvasWH();
             chart.initData();
             chart.draw();*/

            var drawArea = new Gips.DrawArea();
            drawArea.initCanvasWH();
            drawArea.addListener();
            Gips.arrow.initContext();
            var chart = new Gips.Chart({
                level: 0,
                canvas: drawArea.canvas,
                context: drawArea.context,
                drawArea: drawArea
            });

            /*var chart2 = new Gips.Chart({
             level: 0,
             canvas: drawArea.canvas,
             context: drawArea.context,
             drawArea: drawArea
             });

             var chart3 = new Gips.Chart({
             level: 1,
             canvas: drawArea.canvas,
             context: drawArea.context,
             drawArea: drawArea
             });*/

            drawArea.addChart(chart);
            //drawArea.addChart(chart2);
            //drawArea.addChart(chart3);
            drawArea.fitChart();

            chart.initData();
            chart.setScope();
            chart.draw();


            /*Gips.arrow.dynArrowSize();*/
            /*var beginPoint = {
                x: 100, y: 200
            }
            var stopPoint = {
                x: 200, y: 300
            }
            Gips.arrow.arrowCoord(beginPoint, stopPoint);
            Gips.arrow.sideCoord();
            Gips.arrow.drawArrow();*/


            //chart2.setScope();

            //chart2.ySpace += chart2.chartHeight*2;
            //chart2.initData();
            //chart2.scopeStartX = chart2.chartWidth;
            //chart2.draw();

            //chart3.setScope();
            //chart3.initData();
            //chart3.scopeStartY = chart3.chartHeight;
            //chart3.draw();

            //chart.initData(drawArea.chartScopes.get(0).width, )


            /*var chartData;
             var p = $http({
             method: 'POST',
             url: Gips.Config.localServerUrl + "/getData"

             });

             p.success(function(response) {
             console.log(response);
             });

             chart.initCanvasWH();
             chart.setChartData(chard)*/
        }
    }
});