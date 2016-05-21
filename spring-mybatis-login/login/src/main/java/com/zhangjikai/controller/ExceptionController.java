package com.zhangjikai.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Zhang Jikai on 16-3-30.
 */
@ControllerAdvice
public class ExceptionController {

    Logger logger = LoggerFactory.getLogger(ExceptionController.class);
    @ExceptionHandler(Exception.class)
    public String handleException(HttpServletRequest request, Exception exception) {

        logger.info("handle Exception ....");
        //request.setAttribute("exception", exception);
        exception.printStackTrace();
        return "error";
    }
}
