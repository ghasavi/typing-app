package com.example.typingapp.service;

import com.example.typingapp.model.Paragraph;
import com.example.typingapp.repository.ParagraphRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminParagraphService {

    private final ParagraphRepository repository;

    public AdminParagraphService(ParagraphRepository repository) {

        this.repository = repository;

    }

    public List<Paragraph> getAllParagraphs() {

        return repository.findAll();

    }

    public Paragraph addParagraph(

            Paragraph paragraph

    ) {

        return repository.save(paragraph);

    }

    public Paragraph updateParagraph(

            Long id,

            Paragraph updatedParagraph

    ) {

        Paragraph paragraph = repository.findById(id)

                .orElseThrow(() -> new RuntimeException("Paragraph not found"));

        paragraph.setText(updatedParagraph.getText());

        paragraph.setDifficulty(updatedParagraph.getDifficulty());

        return repository.save(paragraph);

    }

    public void deleteParagraph(

            Long id

    ) {

        repository.deleteById(id);

    }

}