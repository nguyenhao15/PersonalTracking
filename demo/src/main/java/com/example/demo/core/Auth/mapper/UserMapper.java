package com.example.demo.core.Auth.mapper;

import com.example.demo.core.Auth.dtos.user.CreateUserRequest;
import com.example.demo.core.Auth.dtos.user.CustomUserDetails;
import com.example.demo.core.Auth.dtos.user.UserDTO;
import com.example.demo.core.Auth.dtos.user.UserSummaryDto;
import com.example.demo.core.Auth.models.Users;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toDto(Users user);

    Users fromCreateRequestToEntity(CreateUserRequest createUserRequest);

    UserDTO formCustomUserDetailsToUserDto(CustomUserDetails customUserDetails);

    UserSummaryDto fromUserToUserSummaryDto(Users user);

    List<UserSummaryDto> fromUsersToUserSummaryDto(List<Users> users);

    @BeanMapping(nullValuePropertyMappingStrategy = org.mapstruct.NullValuePropertyMappingStrategy.IGNORE)
    Users updateUserInfo(UserDTO userDTO,  @MappingTarget Users user);
}
