package com.hospital.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("auth-service", r -> r.path("/api/auth/**").uri("lb://AUTH-SERVICE"))
                .route("patient-service", r -> r.path("/api/patients/**", "/api/doctors/**", "/api/nurses/**").uri("lb://PATIENT-SERVICE"))
                .route("ward-service", r -> r.path("/api/wards/**").uri("lb://WARD-SERVICE"))
                .build();
    }
}