package com.zhangjikai.controller;

import com.zhangjikai.bean.User;
import com.zhangjikai.service.UserService;
import com.zhangjikai.utils.Constants;
import com.zhangjikai.utils.ServiceResults;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Zhang Jikai on 2016/5/13.
 */

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/checkUsername", method = RequestMethod.POST, produces = "application/json;charset=utf8")
    @ResponseBody
    public String checkUsername(@RequestParam String username) {
        if (isNull(username)) {
            return Constants.USER_EXISTS;
        }
        User user = new User();
        user.setUserName(username);
        if (userService.isExists(user)) {
            return Constants.USER_EXISTS;
        } else {
            return Constants.USER_NO_EXISTS;
        }
    }

    @RequestMapping(value = "/checkEmail", method = RequestMethod.POST, produces = "application/json;charset=utf8")
    @ResponseBody
    public String checkEmail(@RequestParam("email") String email) {
        if (isNull(email)) {
            return Constants.USER_EXISTS;
        }
        User user = new User();
        user.setEmail(email);
        if (userService.isExists(user)) {
            return Constants.USER_EXISTS;
        } else {
            return Constants.USER_NO_EXISTS;
        }
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = "application/json;charset=utf8")
    @ResponseBody
    public String register(@RequestBody User user) {
        if(user == null) {
            return Constants.USER_REGISTER_FAIL;
        }

        if(isNull(user.getUserName()) || isNull(user.getPassword()) || isNull(user.getEmail())) {
            return Constants.USER_REGISTER_FAIL;
        }

        if(checkLen(user.getUserName(), 6) || checkLen(user.getPassword(), 8)) {
            return Constants.USER_REGISTER_FAIL;
        }

        if(!isEmail(user.getEmail())) {
            return Constants.USER_REGISTER_FAIL;
        }

        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));

        User user2 = new User();
        user2.setUserName(user.getUserName());
        if(userService.isExists(user2)) {
            return Constants.USER_REGISTER_FAIL;
        }
        user2.setUserName(null);
        user2.setEmail(user.getEmail());
        if(userService.isExists(user2)) {
            return  Constants.USER_REGISTER_FAIL;
        }

        if(userService.addUser(user) == ServiceResults.FAILURE) {
            return Constants.USER_REGISTER_FAIL;
        }
        return Constants.USER_REGISTER_SUCCESS;

    }

    @RequestMapping(value = "/userLogin", produces = "application/json;charset=utf8")
    @ResponseBody
    public String login(@RequestBody User user) {
        if(user == null) {
            return Constants.LOGIN_INTERNAL_ERROR;
        }


        User queryUser = new User();
        User resultUser = null;
        queryUser.setUserName(user.getUserName());
        resultUser = userService.findUser(queryUser);

        if(resultUser == null) {
            return Constants.LOGIN_USERNAME_ERROR;
        }

        if(BCrypt.checkpw( user.getPassword(),resultUser.getPassword())) {
            return Constants.LOGIN_SUCCESS;
        }
        return  Constants.LOGIN_PASSWORD_ERROR;

    }

    private boolean isEmail(String email) {
        Pattern p = Pattern.compile("^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");
        Matcher matcher = p.matcher(email);
        if(matcher.matches()) {
            return true;
        }
        return false;
    }

    private boolean checkLen(String str, int len) {
        if(str.length() < len) {
            return true;
        }
        return false;
    }

    private boolean isNull(String str) {
        if (str == null || str.trim().equals("")) {
            return true;
        } else {
            return false;
        }
    }
}
