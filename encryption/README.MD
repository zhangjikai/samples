# java 加密

<!-- toc -->

- [Base64](#base64)
  * [原理](#%E5%8E%9F%E7%90%86)
  * [使用](#%E4%BD%BF%E7%94%A8)

<!-- tocstop -->

## Base64
[从原理上搞定编码-- Base64编码](http://www.cnblogs.com/chengxiaohui/articles/3951129.html)
### 原理
使用 64 个可打印字符 `A-Z`,`a-z`,`0-9`,`+`,`-` 表示所有字符，64个字符使用6个bit表示，剩下的2bit的填为0，将3个原始字节作为一组（共24个bit），编码为4个`Base64`字节。4个`Base64`字节为一组，最后不足4个时补`=`。具体参考上面的文章

### 使用
```java
 public static String base64Encode(String original) {
    String encyStr = "";
    try {
        byte[] bytes = original.getBytes("UTF-8");
        encyStr = Base64.getEncoder().encodeToString(bytes);
    } catch (UnsupportedEncodingException e) {
        e.printStackTrace();
        encyStr = "";
    }
    return encyStr;
        //String enStr =
}

public static String base64Decode(String encyStr) {
    String original = "";
    byte[] bytes = Base64.getDecoder().decode(encyStr);
    original = new String(bytes);
    return original;
}
```