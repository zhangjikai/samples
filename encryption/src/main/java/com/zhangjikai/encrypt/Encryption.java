package com.zhangjikai.encrypt;

import java.io.UnsupportedEncodingException;
import java.util.Base64;

/**
 * Created by ZhangJikai on 2016/10/26.
 */
public class Encryption {


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
}
