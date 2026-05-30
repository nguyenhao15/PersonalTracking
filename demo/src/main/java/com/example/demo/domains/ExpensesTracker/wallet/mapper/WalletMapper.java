package com.example.demo.domains.ExpensesTracker.wallet.mapper;

import com.example.demo.domains.ExpensesTracker.wallet.dto.wallet.WalletInfoDto;
import com.example.demo.domains.ExpensesTracker.wallet.dto.wallet.WalletRequestDto;
import com.example.demo.domains.ExpensesTracker.wallet.entity.WalletEntity;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.awt.image.VolatileImage;

@Mapper(componentModel = "spring")
public interface WalletMapper {

    WalletEntity fromRequestToEntity(WalletRequestDto  walletRequestDto);

    WalletInfoDto fromEntityToDto(WalletEntity walletEntity);

    @BeanMapping(nullValuePropertyMappingStrategy = org.mapstruct.NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromRequest(WalletRequestDto walletRequestDto,@MappingTarget WalletEntity walletEntity);
}
