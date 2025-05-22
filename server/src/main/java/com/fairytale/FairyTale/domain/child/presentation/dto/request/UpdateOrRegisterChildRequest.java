package com.fairytale.FairyTale.domain.child.presentation.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateOrRegisterChildRequest {

    private String name;
    private Integer mascotId;
}
