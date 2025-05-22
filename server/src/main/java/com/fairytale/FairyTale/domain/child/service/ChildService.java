package com.fairytale.FairyTale.domain.child.service;

import com.fairytale.FairyTale.domain.child.presentation.dto.request.UpdateOrRegisterChildRequest;
import com.fairytale.FairyTale.domain.child.presentation.dto.response.ChildrenResponse;

public interface ChildService {

    ChildrenResponse getChildList();

    void registerNewChild(UpdateOrRegisterChildRequest request);

    ChildrenResponse.ChildDto updateChildProfile(Long childId, UpdateOrRegisterChildRequest request);

    void deleteChild(Long childId);
}
