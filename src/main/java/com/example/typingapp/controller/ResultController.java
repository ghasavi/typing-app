package com.example.typingapp.controller;

import com.example.typingapp.dto.TypingResultResponse;
import com.example.typingapp.model.TypingResult;
import com.example.typingapp.service.ResultService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "http://localhost:5173")
public class ResultController {

    private final ResultService service;

    public ResultController(ResultService service) {
        this.service = service;
    }

    @PostMapping("/{userId}")
    public TypingResultResponse saveResult(
            @PathVariable Long userId,
            @RequestBody TypingResult result) {

        return service.saveResult(userId, result);
    }

    @GetMapping
    public List<TypingResultResponse> getAllResults() {
        return service.getAllResults();
    }
}