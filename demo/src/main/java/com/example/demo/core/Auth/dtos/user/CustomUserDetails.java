package com.example.demo.core.Auth.dtos.user;

import com.example.demo.core.Auth.models.SystemRole;
import com.example.demo.core.Auth.models.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Data
@NoArgsConstructor
public class CustomUserDetails implements UserDetails {

    private Long id;
    private String username;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;
    private String fullName;

    private String email;
    private SystemRole userRole;


    public CustomUserDetails(Users user) {
        this.id = user.getId();

        this.username = user.getUsername();

        this.fullName = user.getFullName();

        this.password = user.getPassword();

        this.email = user.getEmail();

        this.userRole = user.getUserRole();

        List<SimpleGrantedAuthority> auths = new ArrayList<>();

        auths.add(new SimpleGrantedAuthority("ROLE_" + user.getUserRole()));
        this.authorities = auths;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
