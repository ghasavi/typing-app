package com.example.typingapp.dto;

public class AdminDashboardResponse {

    private long totalUsers;

    private long totalTests;

    private long totalParagraphs;

    private double averageWpm;

    public AdminDashboardResponse() {
    }

    public AdminDashboardResponse(
            long totalUsers,
            long totalTests,
            long totalParagraphs,
            double averageWpm
    ) {
        this.totalUsers = totalUsers;
        this.totalTests = totalTests;
        this.totalParagraphs = totalParagraphs;
        this.averageWpm = averageWpm;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalTests() {
        return totalTests;
    }

    public void setTotalTests(long totalTests) {
        this.totalTests = totalTests;
    }

    public long getTotalParagraphs() {
        return totalParagraphs;
    }

    public void setTotalParagraphs(long totalParagraphs) {
        this.totalParagraphs = totalParagraphs;
    }

    public double getAverageWpm() {
        return averageWpm;
    }

    public void setAverageWpm(double averageWpm) {
        this.averageWpm = averageWpm;
    }

}