package com.example.typingapp.dto;

public class DashboardResponse {

    private int testsCompleted;

    private int bestWpm;

    private double averageWpm;

    private double averageAccuracy;

    public DashboardResponse() {
    }

    public DashboardResponse(
            int testsCompleted,
            int bestWpm,
            double averageWpm,
            double averageAccuracy
    ) {

        this.testsCompleted = testsCompleted;
        this.bestWpm = bestWpm;
        this.averageWpm = averageWpm;
        this.averageAccuracy = averageAccuracy;

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

    public double getAverageWpm() {
        return averageWpm;
    }

    public void setAverageWpm(double averageWpm) {
        this.averageWpm = averageWpm;
    }

    public double getAverageAccuracy() {
        return averageAccuracy;
    }

    public void setAverageAccuracy(double averageAccuracy) {
        this.averageAccuracy = averageAccuracy;
    }

}