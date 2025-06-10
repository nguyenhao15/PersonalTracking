package com.haro._5.mappers;


import com.haro._5.dtos.AuthDTO.UserInfoDTO;
import com.haro._5.models.Users;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserInfoDTO toDto(Users user);

}
