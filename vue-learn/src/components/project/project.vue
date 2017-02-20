<template>
    <!--<div class="project">
        <div class="inner">
            <div class="project-title">{{project.title}}</div>
            <div class="project-tag">
                <i class="fa fa-tags" aria-hidden="true"></i>
                <a href="#" v-for="tag in project.tags">{{tag}}</a>
            </div>
            <div class="project-content">
                <p>{{project.content}}</p>
            </div>
            <div class="project-url">
                <a :href="project.source" v-if="project.source !== null" target="_blank">源码</a>
                <a :href="project.url" v-if="project.url !== null" target="_blank">在线地址</a>
            </div>
        </div>

    </div>-->

    <div class="project">
        <div class="inner">
            <div class="project-title">{{project.title}}</div>
            <div class="project-tag">
                <i class="fa fa-tags" aria-hidden="true"></i>
                <a href="#" v-for="tag in project.tags">{{tag}}</a>
            </div>
            <div class="project-content">
                <ul>
                    <li><code>Prism.js</code> / <code>Highlight.js</code> 代码高亮</li>
                    <li>自动生成目录</li>
                    <li>本地图片显示</li>
                    <li>导出 Html （包含样式）

                        <ul>
                            <li>BackToTop</li>
                            <li>多说</li>
                        </ul></li>
                    <li>扩展功能

                        <ul>
                            <li>Toto 列表</li>
                            <li><a href="https://github.com/mathjax/MathJax">MathJax</a> </li>
                            <li><a href="https://github.com/bramp/js-sequence-diagrams">时序图 (Js sequence diagrams)</a></li>
                            <li><a href="https://github.com/Ranks/emojify.js">Emoji (Emojify.js)</a></li>
                            <li><a href="http://echarts.baidu.com/">ECharts</a></li>
                            <li><a href="http://fancybox.net/">Fancybox</a></li>
                        </ul></li>
                </ul>
            </div>
            <div class="project-url">
                <a :href="project.source" v-if="project.source !== null" target="_blank">源码</a>
                <a :href="project.url" v-if="project.url !== null" target="_blank">在线地址</a>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props: ['project'],
        data: {
            project: {}
        }

    }
</script>

<style lang="less">

    @import "project.less";

</style>