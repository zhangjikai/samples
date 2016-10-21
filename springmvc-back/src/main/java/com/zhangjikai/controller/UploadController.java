package com.zhangjikai.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by ZhangJikai on 2016/10/21.
 */

@RestController
public class UploadController {
    @RequestMapping(value = "/getData", method = RequestMethod.GET, produces = "application/json;charset=utf8")
    @ResponseBody
    public String getData() {
        return "success";
    }
}
