package com.chatapp.backend_spring.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JwtService {
    private static final String SECRET_KEY = "yourverylongsecuresecretkeyyourverylongsecuresecretkey";

  public String generateToken(String email){
      return Jwts
              .builder()
              .subject(email)
              .issuedAt(new Date())
              .expiration(new Date(System.currentTimeMillis()+1000*60*60))
              .signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
  }

  public String extractEmail(String Token) {
      return extractClaim(Token, Claims::getSubject);
  }

    public <T> T extractClaim( String token , Function<Claims, T> claimsResolver ) {

        final Claims claims = extractAllClaims(token);

        return claimsResolver.apply(claims);
    }


    public boolean isTokenValid(String token, String email) {

        final String extractedEmail = extractEmail(token);

        return extractedEmail.equals(email)
                && !isTokenExpired(token);
    }


    private boolean isTokenExpired(String token) {

        return extractExpiration(token)
                .before(new Date());
    }

    private Date extractExpiration(String token) {

        return extractClaim(token, Claims::getExpiration);
    }



    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }



    private Key getSigningKey() {

        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes()
        );
    }
}
