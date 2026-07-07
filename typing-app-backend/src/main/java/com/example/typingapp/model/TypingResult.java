package com.example.typingapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "typing_results")
public class TypingResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int wpm;

    private double accuracy;

    private int time;

    private String difficulty;

    private int charactersTyped;

    private int correctCharacters;

    private int incorrectCharacters;

    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    public TypingResult() {
    }

    @PrePersist
    public void prePersist() {

        createdAt = LocalDateTime.now();

    }

    public Long getId() {

        return id;

    }

    public int getWpm() {

        return wpm;

    }

    public void setWpm(int wpm) {

        this.wpm = wpm;

    }

    public double getAccuracy() {

        return accuracy;

    }

    public void setAccuracy(double accuracy) {

        this.accuracy = accuracy;

    }

    public int getTime() {

        return time;

    }

    public void setTime(int time) {

        this.time = time;

    }

    public String getDifficulty() {

        return difficulty;

    }

    public void setDifficulty(String difficulty) {

        this.difficulty = difficulty;

    }

    public int getCharactersTyped() {

        return charactersTyped;

    }

    public void setCharactersTyped(int charactersTyped) {

        this.charactersTyped = charactersTyped;

    }

    public int getCorrectCharacters() {

        return correctCharacters;

    }

    public void setCorrectCharacters(int correctCharacters) {

        this.correctCharacters = correctCharacters;

    }

    public int getIncorrectCharacters() {

        return incorrectCharacters;

    }

    public void setIncorrectCharacters(int incorrectCharacters) {

        this.incorrectCharacters = incorrectCharacters;

    }

    public LocalDateTime getCreatedAt() {

        return createdAt;

    }

    public void setCreatedAt(LocalDateTime createdAt) {

        this.createdAt = createdAt;

    }

    public User getUser() {

        return user;

    }

    public void setUser(User user) {

        this.user = user;

    }

}