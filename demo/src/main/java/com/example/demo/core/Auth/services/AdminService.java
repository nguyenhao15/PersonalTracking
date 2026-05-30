package com.example.demo.core.Auth.services;

import com.example.demo.core.Auth.dtos.user.UserDTO;
import com.example.demo.core.Auth.dtos.user.UserSummaryDto;
import com.example.demo.core.Auth.models.Users;
import com.example.demo.utils.BasePageResponse;
import com.example.demo.utils.FilterWithPagination;

import java.util.List;

public interface AdminService {

    Users getUserById(String id);

    List<UserDTO> searchUser(String keyword);

    BasePageResponse<UserSummaryDto> getAllUsers(FilterWithPagination filter);

    UserDTO updateLockUser(String userId, boolean locked);

    void updateUserRole(String userId, String roleName);

    UserDTO resetPassword(String userId);

    UserDTO activateUser(String userId);

    UserDTO updateUserInfo(String userId, UserDTO updateUserRequest);

}
