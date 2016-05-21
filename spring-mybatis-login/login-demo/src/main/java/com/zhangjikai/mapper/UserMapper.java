package com.zhangjikai.mapper;

import com.zhangjikai.bean.User;

/**
 * Created by Zhang Jikai on 2016/5/12.
 */
public interface UserMapper {


    public String isExists(User user);

    public User findUser(User user);

    public int addUser(User user);

    public int updateUser(User user);

    public int deleteUser(User user);


}
