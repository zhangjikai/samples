package com.zhangjikai.service;

import com.zhangjikai.bean.User;
import com.zhangjikai.utils.ServiceResults;

import java.util.List;

/**
 * Created by Zhang Jikai on 2016/5/12.
 */

public interface UserService {


    public boolean isExists(User user);

    public User findUser(User user);

    public List<User> findUsers();

    public ServiceResults addUser(User user);

    public ServiceResults updateUser(User user);

    public ServiceResults deleteUser(User user);



}
