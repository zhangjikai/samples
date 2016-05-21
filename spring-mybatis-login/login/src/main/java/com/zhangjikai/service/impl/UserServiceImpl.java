package com.zhangjikai.service.impl;

import com.zhangjikai.bean.User;
import com.zhangjikai.mapper.UserMapper;
import com.zhangjikai.service.UserService;
import com.zhangjikai.utils.ServiceResults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.List;

/**
 * Created by Zhang Jikai on 2016/5/12.
 */

@Transactional
@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;


    @Override
    public boolean isExists(User user) {
        String result = userMapper.isExists(user);
        if (result == null) {
            return false;
        }
        return true;
    }


    @Override
    public User findUser(User user) {
        User user2 = null;
        user2 = userMapper.findUser(user);
        return user2;
    }

    @Override
    public List<User> findUsers() {
        return null;
    }

    @Override
    public ServiceResults addUser(User user) {
        try {
            userMapper.addUser(user);
            return ServiceResults.SUCCESS;
        } catch (RuntimeException e) {
            e.printStackTrace();
            // 手动回滚
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return ServiceResults.FAILURE;
        }
    }

    @Override
    public ServiceResults updateUser(User user) {
        return null;
    }

    @Override
    public ServiceResults deleteUser(User user) {
        return null;
    }

}
