package com.zhangjikai.encrypt;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
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

    public static String MD5(String original) {
        String encyStr = "";
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            byte[] bytes = original.getBytes("UTF-8");
            md5.update(bytes);
            BigInteger integer = new BigInteger(md5.digest());
            encyStr = integer.toString(16);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return encyStr;
    }
}
