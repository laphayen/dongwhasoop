package com.fairytale.FairyTale.domain.child.presentation.dto.response;

import com.fairytale.FairyTale.domain.child.domain.Child;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ChildrenResponse {

    private List<ChildDto> childList;

    public static ChildrenResponse from(List<Child> children) {
        List<ChildDto> childDtoList = children.stream()
                .map(ChildDto::from)
                .toList();

        return ChildrenResponse.builder()
                .childList(childDtoList)
                .build();
    }

    @Getter
    @Builder
    public static class ChildDto {

        private Long childId;
        private String childName;
        private Integer mascotId;

        public static ChildDto from(Child child) {
            return ChildDto.builder()
                    .childId(child.getId())
                    .childName(child.getName())
                    .mascotId(child.getMascotId())
                    .build();
        }
    }
}
