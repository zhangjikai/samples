/**
 * Created by ZhangJikai on 2016/10/13.
 */
Gips.helper = {
    windowToCanvas: function (canvas, x, y) {
        var bbox = canvas.getBoundingClientRect();
        return {
            x: x - bbox.left,
            y: y - bbox.top
        }
    }
}