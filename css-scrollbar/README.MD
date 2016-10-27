# CSS定义滚动条样式
* [CSS3自定义滚动条样式 -webkit-scrollbar](http://www.xuanfengge.com/css3-webkit-scrollbar.html)
* [自定义浏览器滚动条的样式，打造属于你的滚动条风格](http://www.lyblog.net/detail/314.html)
* [19个带示例的jQuery滚动条插件](http://www.oschina.net/question/89964_62203)
* [jScrollPane](https://github.com/vitch/jScrollPane)

## 一些样式
```css
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0,0,0,0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  /*background: rgba(255,0,0,0.4);*/
}
```