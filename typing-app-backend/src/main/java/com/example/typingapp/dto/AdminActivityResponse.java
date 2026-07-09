package com.example.typingapp.dto;

public class AdminActivityResponse {

    private String date;
    private long tests;

    public AdminActivityResponse() {
    }

    public AdminActivityResponse(String date, long tests) {
        this.date = date;
        this.tests = tests;
    }

    public String getDate() {
        return date;
    }

    public long getTests() {
        return tests;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setTests(long tests) {
        this.tests = tests;
    }
}