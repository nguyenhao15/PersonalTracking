package com.haro._5.mappers;


import com.haro._5.dtos.SavingTransferDTO.SavingTransferInfo;
import com.haro._5.dtos.SavingTransferDTO.UpdateSavingTransferDTO;
import com.haro._5.models.SIRecord;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface TransferSavingMapper {
    SavingTransferInfo toDto(SIRecord siRecord);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(UpdateSavingTransferDTO request, @MappingTarget SIRecord siRecord);

}
