package com.haro._5.mappers;

import com.haro._5.dtos.DebtDTO.DebtInfoDTO;
import com.haro._5.dtos.DebtDTO.UpdateDebtRequest;
import com.haro._5.models.Debt;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface DebtMapper {
    DebtInfoDTO toDto(Debt debt);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(UpdateDebtRequest request, @MappingTarget Debt debt);
}
