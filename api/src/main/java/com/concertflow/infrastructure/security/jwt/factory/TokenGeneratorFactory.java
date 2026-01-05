package com.concertflow.infrastructure.security.jwt.factory;

import com.concertflow.infrastructure.security.jwt.generator.TokenGenerator;
import com.concertflow.infrastructure.security.jwt.model.TokenType;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.utils.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class TokenGeneratorFactory {
    private final Map<String, TokenGenerator> tokenGenerators;

    public TokenGenerator getGenerator(TokenType tokenType) {
        String beanName = StringUtils.toCamelCase(tokenType.getValue()) + "TokenGenerator";
        TokenGenerator generator = tokenGenerators.get(beanName);

        if (generator == null) {
            throw new IllegalArgumentException("No generator found for token type: " + tokenType);
        }

        return generator;
    }

    public String generateToken(User user, TokenType tokenType) {
        return getGenerator(tokenType).generateToken(user);
    }
}

