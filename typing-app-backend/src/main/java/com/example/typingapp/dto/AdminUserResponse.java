package com.example.typingapp.dto;

public class AdminUserResponse {

    private Long id;

    private String username;

    private String role;

    private boolean active;

    private long testsCompleted;

    private String createdAt;

    public AdminUserResponse() {
    }

    public AdminUserResponse(
            Long id,
            String username,
            String role,
            int testsCompleted,
            String createdAt,
            boolean active
    ) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.testsCompleted = testsCompleted;
        this.createdAt = createdAt;
        this.active = active;
    }

    public boolean isActive() {
        return active;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public long getTestsCompleted() {
        return testsCompleted;
    }

    public void setTestsCompleted(long testsCompleted) {
        this.testsCompleted = testsCompleted;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

}