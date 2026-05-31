package com.example.demo.configs;

import com.example.demo.core.annotation.InstanceApiController;
import jakarta.validation.constraints.NotNull;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${frontend.url}")
    String frontEndUrl;

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.addPathPrefix("/api/v1", c -> c.isAnnotationPresent(InstanceApiController.class)
                && "v1".equals(c.getAnnotation(InstanceApiController.class).version()));

        configurer.addPathPrefix("/api/v2", c -> c.isAnnotationPresent(InstanceApiController.class)
                && "v2".equals(c.getAnnotation(InstanceApiController.class).version()));
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(frontEndUrl)
                        .allowedMethods("GET", "POST","PATCH" ,"PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
                registry.addMapping("/v3/api-docs/**").allowedOrigins(frontEndUrl);
            }
        };
    }
}
