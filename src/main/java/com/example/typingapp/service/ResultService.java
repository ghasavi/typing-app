package com.example.typingapp.service;

import com.example.typingapp.dto.TypingResultResponse;
import com.example.typingapp.dto.UserResponse;
import com.example.typingapp.model.TypingResult;
import com.example.typingapp.model.User;
import com.example.typingapp.repository.TypingResultRepository;
import com.example.typingapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResultService {

    private final TypingResultRepository resultRepository;
    private final UserRepository userRepository;

    public ResultService(TypingResultRepository resultRepository,
                         UserRepository userRepository) {
        this.resultRepository = resultRepository;
        this.userRepository = userRepository;
    }

    public TypingResultResponse saveResult(Long userId, TypingResult result) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        result.setUser(user);

        TypingResult saved = resultRepository.save(result);

        return convertToDTO(saved);
    }

    public List<TypingResultResponse> getAllResults() {

        return resultRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private TypingResultResponse convertToDTO(TypingResult result) {

        User user = result.getUser();

        UserResponse userResponse =
                new UserResponse(user.getId(), user.getUsername());

        return new TypingResultResponse(
                result.getId(),
                result.getWpm(),
                result.getAccuracy(),
                result.getTime(),
                userResponse
        );
    }
}