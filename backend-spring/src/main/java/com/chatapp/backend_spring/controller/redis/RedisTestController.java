package com.chatapp.backend_spring.controller;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.Map;

@RestController
@RequestMapping("/api/dev/redis-test")
public class RedisTestController {

    private final StringRedisTemplate redisTemplate;

    public RedisTestController(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @GetMapping
    public Map<String, String> testRedis() {

        // Write a value to Redis with a 60-second expiry
        redisTemplate.opsForValue().set(
                "nexa:redis-test",
                "Redis connected successfully!",
                Duration.ofSeconds(60)
        );

        // Read the value back from Redis
        String value = redisTemplate.opsForValue()
                .get("nexa:redis-test");

        return Map.of(
                "status", "success",
                "redisValue", value
        );
    }
}