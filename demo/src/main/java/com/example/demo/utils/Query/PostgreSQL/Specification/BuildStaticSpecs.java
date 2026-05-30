package com.example.demo.utils.Query.PostgreSQL.Specification;

import org.springframework.data.jpa.domain.Specification;

public interface BuildStaticSpecs {

    <T> Specification<T> isNotDeleted(String localIsDeletedFieldName);

}
