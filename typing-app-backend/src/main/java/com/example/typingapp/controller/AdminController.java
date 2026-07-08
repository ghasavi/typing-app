package com.example.typingapp.controller;

import com.example.typingapp.dto.AdminDashboardResponse;
import com.example.typingapp.service.AdminService;
import org.springframework.web.bind.annotation.*;
import com.example.typingapp.dto.AdminUserResponse;
import org.springframework.security.core.Authentication;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService service;

    public AdminController(AdminService service) {

        this.service = service;

    }

    @GetMapping("/dashboard")
    public AdminDashboardResponse dashboard() {

        return service.getDashboard();

    }

    @GetMapping("/users")
    public List<AdminUserResponse> users() {

        return service.getUsers();

    }
    @DeleteMapping("/users/{id}")
    public void deleteUser(

            @PathVariable Long id,

            Authentication authentication

    ) {

        service.deleteUser(

                id,

                authentication.getName()

        );

    }

}