package com.fairytale.FairyTale.global.util.user;

import com.fairytale.FairyTale.domain.user.domain.User;

public interface UserUtils {

    User getUserById(Long id);
    User getUserFromSecurityContext();

    void setSecurityContextManual(User user);

}
