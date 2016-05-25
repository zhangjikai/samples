## 前言
本示例是基于 Spring MVC + Mybatis 的一个登陆注册示例， 前台使用的是 AngularJs和Bootstrap（[Angular UI for Bootstrap](https://angular-ui.github.io/bootstrap/)）。因为也是初学，代码有不当的地方请多多指出。
## Spring
### Spring MVC Rest
后台主要提供 rest 接口，前台使用 ajax 进行交互。Spring MVC 使用 rest 还是很简单的，只要把相关的类库配置好（具体可以看 Spring 的配置文件），然后只需要下面两个步骤即可：
* 在类名上加上 `@RestController` 注解
* 以 json 的形式响应请求:
    1. 方法上加上 `@ResponseBody` 注解，标明将方法的返回结果作为 http 响应的正文
    2. 在 `@RequestMapping` 注解里加上 `produces = "application/json;charset=utf8"`）

即如下面的形式
```java
@RestController
public class UserController {
    @RequestMapping(value = "/checkUsername", method = RequestMethod.POST, produces = "application/json;charset=utf8")
    @ResponseBody
    public String checkUsername(@RequestParam String username) {
        ...
    }
}
```

###  Spring MVC 统一异常处理
使用 `@ControllerAdvice` 和 `@ExceptionHandler` 来统一处理 Spring MVC 的异常，其中 `ExceptionHandler` 后面跟异常对应的Class，即如下面的形式
```java
@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler(Exception.class)
    public String handleException(HttpServletRequest request, Exception exception) {
        ...
    }
}
```
更多关于 Spring MVC 的异常处理可以参考[Spring MVC Exception Handling – @ExceptionHandler, @ControllerAdvice, HandlerExceptionResolver, JSON Response Example](http://www.journaldev.com/2651/spring-mvc-exception-handling-exceptionhandler-controlleradvice-handlerexceptionresolver-json-response-example)


### Spring 几个常用注解
**`@Component`**
将所标记的类作为 Spring 的