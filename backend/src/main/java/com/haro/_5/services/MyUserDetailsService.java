package com.haro._5.services;

import com.haro._5.models.UserPrincipal;
import com.haro._5.models.Users;
import com.haro._5.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       Optional<Users> userOptional = repo.findByUsername(username);
       if (userOptional.isEmpty()) {
           System.out.println("User not found");
           throw new UsernameNotFoundException("user not found");
       }

       Users user = userOptional.get();

       return new UserPrincipal(user);
    }
}
