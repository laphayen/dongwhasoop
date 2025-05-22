package com.fairytale.FairyTale.domain.user.domain;

import com.fairytale.FairyTale.domain.child.domain.Child;
import com.fairytale.FairyTale.domain.uservoice.domain.UserVoice;
import com.fairytale.FairyTale.global.database.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Table(name = "Users")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "email", nullable = true)
    private String email;

    @Column(name = "oauth_provider", nullable = false)
    private String oauthProvider;

    @Column(name = "oauth_id", nullable = false)
    private String oauthId;

    @Column(name = "is_new", nullable = false)
    private Boolean isNew;

    @Enumerated(EnumType.STRING)
    private final AccountRole accountRole = AccountRole.USER;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private final List<Child> childList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private final List<UserVoice> userVoiceList = new ArrayList<>();

    @Builder
    public User(
            String email,
            String oauthProvider,
            String oauthId,
            Boolean isNew
    ) {
        this.email = email;
        this.oauthProvider = oauthProvider;
        this.oauthId = oauthId;
        this.isNew = isNew;
    }

    // ============ UserDetails 구현 메서드들 ============
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(); // 권한이 필요할 경우 여기서 Role 객체를 리턴하도록 수정 가능
    }

    @Override
    public String getPassword() {
        return null; // OAuth 사용하므로 패스워드는 사용하지 않음
    }

    @Override
    public String getUsername() {
        return this.email != null ? this.email : this.oauthId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
