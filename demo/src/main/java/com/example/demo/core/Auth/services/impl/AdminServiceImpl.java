package com.example.demo.core.Auth.services.impl;

import com.example.demo.core.Auth.dtos.user.UserDTO;
import com.example.demo.core.Auth.dtos.user.UserSummaryDto;
import com.example.demo.core.Auth.models.Users;
import com.example.demo.core.Auth.services.AdminService;
import com.example.demo.utils.BasePageResponse;
import com.example.demo.utils.FilterWithPagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {


    @Override
    public Users getUserById(String id) {
        return null;
    }

    @Override
    public List<UserDTO> searchUser(String keyword) {
        return List.of();
    }

    @Override
    public BasePageResponse<UserSummaryDto> getAllUsers(FilterWithPagination filter) {
        return null;
    }

    @Override
    public UserDTO updateLockUser(String userId, boolean locked) {
        return null;
    }

    @Override
    public void updateUserRole(String userId, String roleName) {

    }

    @Override
    public UserDTO resetPassword(String userId) {
        return null;
    }

    @Override
    public UserDTO activateUser(String userId) {
        return null;
    }

    @Override
    public UserDTO updateUserInfo(String userId, UserDTO updateUserRequest) {
        return null;
    }
}
