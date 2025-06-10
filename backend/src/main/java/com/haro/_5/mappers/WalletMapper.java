package com.haro._5.mappers;

import com.haro._5.dtos.WalletDTO.UpdateWalletRequest;
import com.haro._5.dtos.WalletDTO.WalletInfoDTO;
import com.haro._5.models.Wallet;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface WalletMapper {
    WalletInfoDTO toDto(Wallet wallet);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(UpdateWalletRequest request, @MappingTarget Wallet wallet);
}
