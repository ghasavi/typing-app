package com.example.typingapp.repository;

import com.example.typingapp.model.TypingResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypingResultRepository extends JpaRepository<TypingResult, Long> {

}