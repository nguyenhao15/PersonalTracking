package com.haro._5.mappers;

import com.haro._5.dtos.TransactionDTO.TransactionInfoDTO;
import com.haro._5.dtos.TransactionDTO.UpdateTransactionRequest;
import com.haro._5.models.Transaction;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface TransactionMapper {
    TransactionInfoDTO toDto(Transaction transaction);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(UpdateTransactionRequest request, @MappingTarget Transaction transaction);
}
