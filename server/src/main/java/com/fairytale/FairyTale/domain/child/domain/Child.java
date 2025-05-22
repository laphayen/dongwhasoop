package com.fairytale.FairyTale.domain.child.domain;

import com.fairytale.FairyTale.domain.letterbox.domain.LetterBox;
import com.fairytale.FairyTale.domain.user.domain.User;
import com.fairytale.FairyTale.global.database.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Table(name = "Children")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Child extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "child_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "name", nullable = false)
    private String name;

//    @Enumerated(EnumType.STRING)
//    @Column(name = "gender", nullable = false)
//    private Gender gender;
//
//    @Column(name = "birthday")
//    private LocalDate birthday;

    @Column(name = "mascot_id")
    private Integer mascotId;

    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL)
    private final List<LetterBox> letterBoxes = new ArrayList<>();

//    @Builder
//    public Child(
//            User user,
//            String name,
//            Gender gender,
//            LocalDate birthday,
//            Integer mascotId
//    ) {
//        this.user = user;
//        this.name = name;
//        this.gender = gender;
//        this.birthday = birthday;
//        this.mascotId = mascotId;
//    }

    @Builder
    public Child(
            User user,
            String name,
            Integer mascotId
    ) {
        this.user = user;
        this.name = name;
        this.mascotId = mascotId;
    }

    public void updateName(String name) {
        this.name = name;
    }

    public void updateMascotId(Integer mascotId) {
        this.mascotId = mascotId;
    }
}
