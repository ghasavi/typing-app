package com.example.typingapp.controller;

import com.example.typingapp.dto.ProfileResponse;
import com.example.typingapp.model.TypingResult;
import com.example.typingapp.service.ResultService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.typingapp.dto.DashboardResponse;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "http://localhost:5173")
public class ResultController {

    private final ResultService service;

    public ResultController(ResultService service) {

        this.service = service;

    }

    @PostMapping
    public TypingResult saveResult(

            Authentication authentication,

            @RequestBody TypingResult result

    ) {

        return service.saveResult(

                authentication.getName(),

                result

        );

    }

    @GetMapping
    public List<TypingResult> getAllResults() {

        return service.getAllResults();

    }

    @GetMapping("/leaderboard")
    public List<TypingResult> getLeaderboard() {

        return service.getLeaderboard();

    }

    @GetMapping("/my-results")
    public List<TypingResult> getMyResults(Authentication authentication) {

        return service.getMyResults(

                authentication.getName()

        );

    }

    @GetMapping("/profile")
    public ProfileResponse getProfile(Authentication authentication) {

        return service.getProfile(

                authentication.getName()

        );

    }

    @GetMapping("/dashboard")
    public DashboardResponse getDashboard(
            Authentication authentication
    ){

        return service.getDashboard(
                authentication.getName()
        );

    }

}