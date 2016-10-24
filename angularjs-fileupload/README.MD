# Angularjs 文件上传
[ng-file-upload](https://github.com/danialfarid/ng-file-upload)

## 跨域访问
加上 `withCredentials` 参数，
> `withCredentials`属性使得请求包含了远程域的所有cookies，但值得注意的是，这些cookies仍旧遵守“同域”的准则，因此从代码上你并不能从document.cookies或者回应HTTP头当中进行读取。

```js
Upload.upload({
    url: "",
    data: {},
    withCredentials: true
});
```

* [利用CORS实现跨域请求](http://newhtml.net/using-cors/)  
* [HTTP访问控制(CORS)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)