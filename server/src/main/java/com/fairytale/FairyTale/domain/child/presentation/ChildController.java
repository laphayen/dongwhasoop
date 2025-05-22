package com.fairytale.FairyTale.domain.child.presentation;

import com.fairytale.FairyTale.domain.child.presentation.dto.request.UpdateOrRegisterChildRequest;
import com.fairytale.FairyTale.domain.child.presentation.dto.response.ChildrenResponse;
import com.fairytale.FairyTale.domain.child.service.ChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/children")
public class ChildController {

    private final ChildService childService;

    @GetMapping
    public ChildrenResponse getChildList() {
        return childService.getChildList();
    }

    @PostMapping
    public void registerNewChild(@RequestBody UpdateOrRegisterChildRequest request) {
        childService.registerNewChild(request);
    }

    @PutMapping("/{childId}")
    public ChildrenResponse.ChildDto updateChildProfile(
            @PathVariable Long childId,
            @RequestBody UpdateOrRegisterChildRequest request
    ) {
        return childService.updateChildProfile(childId, request);
    }

    @DeleteMapping("/{childId}")
    public void deleteChild(@PathVariable Long childId) {
        childService.deleteChild(childId);
    }
}
