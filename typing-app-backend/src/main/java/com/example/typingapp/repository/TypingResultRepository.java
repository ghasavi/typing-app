package com.example.typingapp.repository;

import com.example.typingapp.model.TypingResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TypingResultRepository extends JpaRepository<TypingResult, Long> {

    List<TypingResult> findAllByOrderByWpmDesc();

    List<TypingResult> findByUserUsername(String username);

    List<TypingResult> findByUserUsernameOrderByIdDesc(String username);

    List<TypingResult> findByCreatedAtAfter(LocalDateTime date);

}