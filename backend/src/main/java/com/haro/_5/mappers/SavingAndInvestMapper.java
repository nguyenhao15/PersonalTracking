package com.haro._5.mappers;

import com.haro._5.dtos.savingAndInvestDTO.SIInfoDTO;
import com.haro._5.models.SavingAndInvest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SavingAndInvestMapper {
    SIInfoDTO toDto(SavingAndInvest savingAndInvest);
}
