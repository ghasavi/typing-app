package com.example.typingapp.service;

import com.example.typingapp.model.User;
import com.example.typingapp.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {

        this.userRepository = userRepository;

    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username)

        System.out.println(
                "LOGIN USER = " +
                        user.getUsername() +
                        " ROLE = " +
                        user.getRole()
        );

                .orElseThrow(() ->

                        new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User

                .withUsername(user.getUsername())

                .password(user.getPassword())

                .roles(user.getRole().name())   // <-- IMPORTANT

                .build();

    }

}