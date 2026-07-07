package com.example.typingapp.dto;

public class ProfileResponse {

    private String username;
    private int testsCompleted;
    private int bestWpm;
    private double averageAccuracy;

    public ProfileResponse() {
    }

    public ProfileResponse(String username,
                           int testsCompleted,
                           int bestWpm,
                           double averageAccuracy) {

        this.username = username;
        this.testsCompleted = testsCompleted;
        this.bestWpm = bestWpm;
        this.averageAccuracy = averageAccuracy;

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getTestsCompleted() {
        return testsCompleted;
    }

    public void setTestsCompleted(int testsCompleted) {
        this.testsCompleted = testsCompleted;
    }

    public int getBestWpm() {
        return bestWpm;
    }

    public void setBestWpm(int bestWpm) {
        this.bestWpm = bestWpm;
    }

    public double getAverageAccuracy() {
        return averageAccuracy;
    }

    public void setAverageAccuracy(double averageAccuracy) {
        this.averageAccuracy = averageAccuracy;
    }

}