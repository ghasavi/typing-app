package com.example.typingapp.service;

import com.example.typingapp.model.TypingResult;
import com.example.typingapp.model.User;
import com.example.typingapp.repository.TypingResultRepository;
import com.example.typingapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultService {

    private final TypingResultRepository resultRepository;
    private final UserRepository userRepository;

    public ResultService(TypingResultRepository resultRepository,
                         UserRepository userRepository) {
        this.resultRepository = resultRepository;
        this.userRepository = userRepository;
    }

    public TypingResult saveResult(Long userId, TypingResult result) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        result.setUser(user);

        return resultRepository.save(result);
    }

    public List<TypingResult> getAllResults() {
        return resultRepository.findAll();
    }
}