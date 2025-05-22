package com.fairytale.FairyTale.global.config;

import com.fairytale.FairyTale.global.property.JwtProperties;
import com.fairytale.FairyTale.global.property.OauthProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@EnableConfigurationProperties({OauthProperties.class, JwtProperties.class})
@Configuration
public class ConfigurationPropertiesConfig {
}
