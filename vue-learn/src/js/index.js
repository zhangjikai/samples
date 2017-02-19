/**
 * Created by ZhangJikai on 2017/2/19.
 */
require("../less/style.less");
import Vue from 'vue'

new Vue({
    el: '#app',
    data: {
        message: "runoob"
    },
    filters: {
        capitalize: function(value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }
});

