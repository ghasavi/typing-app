package com.example.typingapp.controller;

import com.example.typingapp.model.Paragraph;
import com.example.typingapp.service.TypingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/typing")
@CrossOrigin(origins = "http://localhost:5173")
public class TypingController {

    private final TypingService service;

    public TypingController(TypingService service) {
        this.service = service;
    }

    @GetMapping("/paragraph")
    public Paragraph getParagraph(

            @RequestParam(defaultValue = "easy")
            String difficulty

    ) {

        return service.getRandomParagraph(difficulty);

    }

}