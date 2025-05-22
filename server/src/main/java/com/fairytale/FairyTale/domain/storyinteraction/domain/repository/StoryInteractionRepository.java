package com.fairytale.FairyTale.domain.storyinteraction.domain.repository;

import com.fairytale.FairyTale.domain.storyinteraction.domain.StoryInteraction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryInteractionRepository extends JpaRepository<StoryInteraction, Long> {
}
