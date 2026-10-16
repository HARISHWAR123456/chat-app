package com.chatapp.backend_spring.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.Cache;
import org.springframework.cache.interceptor.CacheErrorHandler;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class RedisCacheErrorHandler implements CacheErrorHandler {

    @Override
    public void handleCacheGetError(
            RuntimeException exception,
            Cache cache,
            Object key
    ) {
        log.error(
                "Redis cache GET failed. Cache: {}, Key: {}. Falling back to database.",
                cache.getName(),
                key,
                exception
        );
    }

    @Override
    public void handleCachePutError(
            RuntimeException exception,
            Cache cache,
            Object key,
            Object value
    ) {
        log.error(
                "Redis cache PUT failed. Cache: {}, Key: {}. Returning method result without caching.",
                cache.getName(),
                key,
                exception
        );
    }

    @Override
    public void handleCacheEvictError(
            RuntimeException exception,
            Cache cache,
            Object key
    ) {
        log.error(
                "Redis cache EVICT failed. Cache: {}, Key: {}. Cache may contain stale data.",
                cache.getName(),
                key,
                exception
        );
    }

    @Override
    public void handleCacheClearError(
            RuntimeException exception,
            Cache cache
    ) {
        log.error(
                "Redis cache CLEAR failed. Cache: {}.",
                cache.getName(),
                exception
        );
    }
}