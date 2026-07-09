package com.chatapp.backend_spring.WebSocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PresenceService {

    private static final Logger logger = LoggerFactory.getLogger(PresenceService.class);

    private final Map<Long,Integer> activeSessions = new ConcurrentHashMap<>();

    public void userConnected(Long userId) {

        activeSessions.merge(userId, 1, Integer::sum);

        logger.info("{}", activeSessions);
    }

    public void userDisconnected(Long userId){

        Integer currentCount=activeSessions.get(userId);

        if (currentCount == null) {
            return;
        }

        if(currentCount<=1){
            activeSessions.remove(userId);
        }
        else{
            activeSessions.put(userId,currentCount-1);
        }
        logger.info("{}", activeSessions);

    }

    public boolean isOnline(Long userId){
        return activeSessions.containsKey(userId);
    }

    public int getActiveSessionCount(Long userId) {

        return activeSessions.getOrDefault(
                userId,
                0
        );
    }
}
