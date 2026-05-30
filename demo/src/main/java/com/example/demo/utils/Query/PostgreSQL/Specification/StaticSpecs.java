package com.example.demo.utils.Query.PostgreSQL.Specification;

import com.example.demo.core.Security.utils.SecureUtilMethod.SecurityRepoUtil;
import com.example.demo.core.Security.utils.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;


@Component
public class StaticSpecs implements BuildStaticSpecs {

    @Autowired
    private SecurityRepoUtil securityRepoUtil;

    @Autowired
    private SecurityUtil securityUtil;

    @Override
    public <T> Specification<T> isNotDeleted(String localIsDeletedFieldName) {
        return (root, query, cb) -> cb.equal(root.get(localIsDeletedFieldName), false);
    }
}
