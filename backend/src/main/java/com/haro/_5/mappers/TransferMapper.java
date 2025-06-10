package com.haro._5.mappers;

import com.haro._5.dtos.TransferDTO.TransferInfoDTO;
import com.haro._5.dtos.TransferDTO.UpdateTransferRequest;
import com.haro._5.models.Transfer;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface TransferMapper {
    TransferInfoDTO toDto(Transfer transfer);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(UpdateTransferRequest request, @MappingTarget Transfer transfer);
}
