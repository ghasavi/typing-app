package com.example.typingapp.controller;

import com.example.typingapp.model.Paragraph;
import com.example.typingapp.service.AdminParagraphService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/paragraphs")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminParagraphController {

    private final AdminParagraphService service;

    public AdminParagraphController(AdminParagraphService service) {

        this.service = service;

    }

    @GetMapping
    public List<Paragraph> getAllParagraphs() {

        return service.getAllParagraphs();

    }

    @PostMapping
    public Paragraph addParagraph(

            @RequestBody Paragraph paragraph

    ) {

        return service.addParagraph(paragraph);

    }

    @PutMapping("/{id}")
    public Paragraph updateParagraph(

            @PathVariable Long id,

            @RequestBody Paragraph paragraph

    ) {

        return service.updateParagraph(id, paragraph);

    }

    @DeleteMapping("/{id}")
    public void deleteParagraph(

            @PathVariable Long id

    ) {

        service.deleteParagraph(id);

    }

}