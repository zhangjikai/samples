/**
 * Created by ZhangJikai on 2017/2/19.
 */

import style from '../less/style.less'
import fontAwesome from 'fontAwesome'
import Vue from 'vue'
import project from '../components/project/project.vue'

Vue.component("project", project);

var vm = new Vue({
    el: '#app',
    data: {
        message: "runoob"
    },
    filters: {
        capitalize: function(value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    },
    methods: {
        greet: function(event) {
            alert("Hello");
        }
    }
});

