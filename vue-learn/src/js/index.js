/**
 * Created by ZhangJikai on 2017/2/19.
 */

import style from '../less/style.less'
import fontAwesome from 'fontAwesome'
import Vue from 'vue'
import project from '../components/project/project.vue'
import marked from '../../node_modules/marked/marked.min.js'

Vue.component("project", project);

var data = [
    {
        "title": "Onlime Markdown Reader",
        "tags": ["JS", "Tool"],
        "content": "Prism.js / Highlight.js 代码高亮, 自动生成目录, 本地图片显示, 导出 Html （包含样式）,BackToTop, 多说",
        "source": "https://github.com/zhangjikai/online-markdown-reader",
        "url": "http://markdown.zhangjikai.com/"
    }
];

console.log(marked(data[0].content));

var vm = new Vue({
    el: '#app',
    data: {
        projects: data
    },
    filters: {
        capitalize: function (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    },
    methods: {
        greet: function (event) {
            alert("Hello");
        }
    }
});

