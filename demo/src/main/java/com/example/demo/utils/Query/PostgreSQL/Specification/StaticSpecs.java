package com.example.demo.utils.Query.PostgreSQL.Specification;

import com.example.demo01.core.Auth.dtos.CustomUserDetails;
import com.example.demo01.core.Security.utils.SecureUtilMethod.SecurityRepoUtil;
import com.example.demo01.core.Security.utils.SecurityUtil;
import com.example.demo01.utils.ModuleEnum;
import com.example.demo01.utils.ScopeView;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StaticSpecs implements BuildStaticSpecs {

    @Autowired
    private SecurityRepoUtil securityRepoUtil;

    @Autowired
    private SecurityUtil securityUtil;

    @Override
    public <T> Specification<T> validLocation(String locationFieldName) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        List<String> allowBuIds = securityRepoUtil.getCurrentAllowedLocations();

        return (root, query, criteriaBuilder) -> {
            if (userDetails.isGlobalAdmin()) {
                return criteriaBuilder.conjunction();
            }
            if (allowBuIds == null || allowBuIds.isEmpty()) {
                return criteriaBuilder.disjunction();
            }
            return root.get(locationFieldName).in(allowBuIds);
        };
    }

    @Override
    public <T> Specification<T> isNotDeleted(String localIsDeletedFieldName) {
        return (root, query, cb) -> cb.equal(root.get(localIsDeletedFieldName), false);
    }
}
