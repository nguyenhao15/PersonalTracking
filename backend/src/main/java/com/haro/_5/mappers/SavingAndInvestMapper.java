package com.haro._5.mappers;

import com.haro._5.dtos.savingAndInvestDTO.SIInfoDTO;
import com.haro._5.dtos.savingAndInvestDTO.UpdateISDTO;
import com.haro._5.models.SavingAndInvest;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface SavingAndInvestMapper {
    SIInfoDTO toDto(SavingAndInvest savingAndInvest);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(UpdateISDTO request, @MappingTarget SavingAndInvest SavingAndInvest);
}
