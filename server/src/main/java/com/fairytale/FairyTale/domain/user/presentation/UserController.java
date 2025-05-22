package com.fairytale.FairyTale.domain.user.presentation;

import com.fairytale.FairyTale.domain.user.presentation.dto.response.TestResponse;
import com.fairytale.FairyTale.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    /**
     * TODO: 테스트 API 입니다~
     */
    @GetMapping("/test")
    public TestResponse getFollowers() {
        return new TestResponse("1");
    }
}
