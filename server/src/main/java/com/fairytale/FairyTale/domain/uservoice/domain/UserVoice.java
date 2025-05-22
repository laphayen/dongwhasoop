package com.fairytale.FairyTale.domain.uservoice.domain;

import com.fairytale.FairyTale.domain.pageaudio.domain.PageAudio;
import com.fairytale.FairyTale.domain.user.domain.User;
import com.fairytale.FairyTale.global.database.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Table(name = "UserVoices")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserVoice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voice_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "voice_url")
    private String voiceUrl;

    @Column(name = "gender")
    private Boolean gender;

//    @Column(name = "voice_sad_url")
//    private String voiceSadUrl;
//
//    @Column(name = "voice_mad_url")
//    private String voiceMadUrl;
//
//    @Column(name = "voice_happy_url")
//    private String voiceHappyUrl;

    @OneToMany(mappedBy = "userVoice", cascade = CascadeType.ALL)
    private final List<PageAudio> pageAudioList = new ArrayList<>();

//    @Builder
//    public UserVoice(User user, String voiceUrl, Boolean gender, String voiceSadUrl, String voiceMadUrl, String voiceHappyUrl) {
//        this.user = user;
//        this.voiceUrl = voiceUrl;
//        this.gender = gender;
//        this.voiceSadUrl = voiceSadUrl;
//        this.voiceMadUrl = voiceMadUrl;
//        this.voiceHappyUrl = voiceHappyUrl;
//    }

    @Builder
    public UserVoice(Long id, User user, String voiceUrl, Boolean gender) {
        this.id = id;
        this.user = user;
        this.voiceUrl = voiceUrl;
        this.gender = gender;
    }

}
