package com.example.typingapp.service;

import com.example.typingapp.model.TypingResult;
import com.example.typingapp.model.User;
import com.example.typingapp.repository.TypingResultRepository;
import com.example.typingapp.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.example.typingapp.dto.ProfileResponse;
import com.example.typingapp.dto.DashboardResponse;

import java.util.List;
import java.util.Optional;

@Service
public class ResultService {

    private final TypingResultRepository resultRepository;
    private final UserRepository userRepository;

    public ResultService(TypingResultRepository resultRepository,
                         UserRepository userRepository) {

        this.resultRepository = resultRepository;
        this.userRepository = userRepository;
    }

    public TypingResult saveResult(

            String username,

            TypingResult result

    ) {

        User user = userRepository

                .findByUsername(username)

                .orElseThrow(() ->

                        new RuntimeException("User not found"));

        result.setUser(user);

        return resultRepository.save(result);

    }

    public List<TypingResult> getAllResults() {

        return resultRepository.findAll();

    }

    public List<TypingResult> getLeaderboard() {

        return resultRepository.findAllByOrderByWpmDesc();

    }
    public List<TypingResult> getMyResults(String username) {

        return resultRepository.findByUserUsernameOrderByIdDesc(username);

    }

    public ProfileResponse getProfile(String username) {

        List<TypingResult> results =
                resultRepository.findByUserUsername(username);

        if(results.isEmpty()) {

            return new ProfileResponse(
                    username,
                    0,
                    0,
                    0
            );

        }

        int bestWpm = results.stream()

                .mapToInt(TypingResult::getWpm)

                .max()

                .orElse(0);

        double averageAccuracy = results.stream()

                .mapToDouble(TypingResult::getAccuracy)

                .average()

                .orElse(0);

        return new ProfileResponse(

                username,

                results.size(),

                bestWpm,

                Math.round(averageAccuracy * 10) / 10.0

        );

    }

    public DashboardResponse getDashboard(String username) {

        List<TypingResult> results =
                resultRepository.findByUserUsernameOrderByIdDesc(username);

        if(results.isEmpty()){

            return new DashboardResponse(
                    0,
                    0,
                    0,
                    0
            );

        }

        int tests = results.size();

        int best = results.stream()
                .mapToInt(TypingResult::getWpm)
                .max()
                .orElse(0);

        double avgWpm = results.stream()
                .mapToInt(TypingResult::getWpm)
                .average()
                .orElse(0);

        double avgAccuracy = results.stream()
                .mapToDouble(TypingResult::getAccuracy)
                .average()
                .orElse(0);

        return new DashboardResponse(

                tests,

                best,

                Math.round(avgWpm * 10.0) / 10.0,

                Math.round(avgAccuracy * 10.0) / 10.0

        );

    }
}