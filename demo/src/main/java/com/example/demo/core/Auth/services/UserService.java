package com.example.demo.core.Auth.services;

import com.example.demo.core.Auth.dtos.user.CreateUserRequest;
import com.example.demo.core.Auth.dtos.user.LoginRequest;
import com.example.demo.core.Auth.dtos.user.LoginResponse;
import com.example.demo.core.Auth.dtos.user.UserDTO;
import com.example.demo.core.Auth.models.Users;

public interface UserService {

    Users getUserEntityInfo();

    UserDTO getMyInfo();

    UserDTO createNewUser(CreateUserRequest createUserRequest);

    LoginResponse login(LoginRequest loginRequest);

    String logout();

    String refreshToken();

    void updatePassword(String oldPassword, String newPassword);

    UserDTO activateUser(String updatePassword);

    UserDTO resetPassword(String userId);

    UserDTO updateMyInfo(String userId, UserDTO updateUserRequest);

}
