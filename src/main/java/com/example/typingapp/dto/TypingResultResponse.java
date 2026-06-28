package com.example.typingapp.dto;

public class TypingResultResponse {

    private Long id;
    private int wpm;
    private double accuracy;
    private int time;
    private UserResponse user;

    public TypingResultResponse() {
    }

    public TypingResultResponse(Long id,
                                int wpm,
                                double accuracy,
                                int time,
                                UserResponse user) {
        this.id = id;
        this.wpm = wpm;
        this.accuracy = accuracy;
        this.time = time;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public int getWpm() {
        return wpm;
    }

    public double getAccuracy() {
        return accuracy;
    }

    public int getTime() {
        return time;
    }

    public UserResponse getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setWpm(int wpm) {
        this.wpm = wpm;
    }

    public void setAccuracy(double accuracy) {
        this.accuracy = accuracy;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }
}