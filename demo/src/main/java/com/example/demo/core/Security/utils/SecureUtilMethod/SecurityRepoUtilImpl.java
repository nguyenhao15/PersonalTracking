package com.example.demo.core.Security.utils.SecureUtilMethod;


import com.example.demo.core.Security.utils.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SecurityRepoUtilImpl implements SecurityRepoUtil{

    @Autowired
    private SecurityUtil securityUtil;

    @Override
    public String getUserRole() {
        return securityUtil.getCurrentUserDetails().getAuthorities().toString();
    }

    @Override
    public String getCurrentUserId() {
        return securityUtil.getCurrentUserDetails().getUsername();
    }
}
