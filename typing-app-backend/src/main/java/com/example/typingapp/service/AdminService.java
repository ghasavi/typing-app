package com.example.typingapp.service;

import com.example.typingapp.dto.AdminActivityResponse;
import com.example.typingapp.dto.AdminDashboardResponse;
import com.example.typingapp.dto.AdminUserResponse;
import com.example.typingapp.model.Role;
import com.example.typingapp.model.TypingResult;
import com.example.typingapp.model.User;
import com.example.typingapp.repository.ParagraphRepository;
import com.example.typingapp.repository.TypingResultRepository;
import com.example.typingapp.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final UserRepository userRepository;

    private final TypingResultRepository resultRepository;

    private final ParagraphRepository paragraphRepository;

    public AdminService(
            UserRepository userRepository,
            TypingResultRepository resultRepository,
            ParagraphRepository paragraphRepository
    ) {

        this.userRepository = userRepository;
        this.resultRepository = resultRepository;
        this.paragraphRepository = paragraphRepository;

    }

    public AdminDashboardResponse getDashboard() {

        long totalUsers = userRepository.count();

        long totalTests = resultRepository.count();

        long totalParagraphs = paragraphRepository.count();

        double averageWpm = resultRepository.findAll()

                .stream()

                .mapToInt(TypingResult::getWpm)

                .average()

                .orElse(0);

        return new AdminDashboardResponse(

                totalUsers,

                totalTests,

                totalParagraphs,

                Math.round(averageWpm * 10) / 10.0

        );

    }
    public List<AdminUserResponse> getUsers() {

        return userRepository.findAll()

                .stream()

                .map(user -> new AdminUserResponse(

                        user.getId(),

                        user.getUsername(),

                        user.getRole() == null
                                ? "USER"
                                : user.getRole().name(),

                        user.getResults().size(),

                        user.getCreatedAt() == null
                                ? "-"
                                : user.getCreatedAt().toLocalDate().toString(),

                        user.isActive()

                ))   // <-- THIS PARENTHESIS WAS MISSING

                .collect(Collectors.toList());

    }

    public void deleteUser(Long id, String currentUsername) {

        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("Current user not found"));

        User userToDelete = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Prevent deleting yourself
        if (currentUser.getId().equals(userToDelete.getId())) {

            throw new RuntimeException("You cannot delete your own account.");

        }

        // Prevent deleting the last admin
        if (userToDelete.getRole() == Role.ADMIN) {

            long adminCount = userRepository.findAll()

                    .stream()

                    .filter(user -> user.getRole() == Role.ADMIN)

                    .count();

            if (adminCount <= 1) {

                throw new RuntimeException("Cannot delete the last administrator.");

            }

        }

        userRepository.delete(userToDelete);

    }

    public void toggleUserStatus(Long id, String currentUsername) {

        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("Current user not found"));

        User target = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(currentUser.getId().equals(target.getId())){

            throw new RuntimeException("You cannot block yourself.");

        }

        if(target.getRole() == Role.ADMIN){

            long adminCount = userRepository.findAll()

                    .stream()

                    .filter(user -> user.getRole() == Role.ADMIN)

                    .filter(User::isActive)

                    .count();

            if(adminCount <= 1){

                throw new RuntimeException("Cannot block the last administrator.");

            }

        }

        target.setActive(!target.isActive());

        userRepository.save(target);

    }

    public List<AdminActivityResponse> getActivity() {

        LocalDate today = LocalDate.now();

        List<AdminActivityResponse> response = new ArrayList<>();

        for(int i=6;i>=0;i--){

            LocalDate day = today.minusDays(i);

            long count = resultRepository.findAll()

                    .stream()

                    .filter(r -> r.getCreatedAt()!=null)

                    .filter(r -> r.getCreatedAt().toLocalDate().equals(day))

                    .count();

            response.add(

                    new AdminActivityResponse(

                            day.toString(),

                            count

                    )

            );

        }

        return response;

    }

}