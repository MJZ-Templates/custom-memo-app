package custom_memo.dev.back.auth.app

import custom_memo.dev.back.auth.domain.CustomUserDetails
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import java.security.Key
import java.time.Instant
import java.util.*

@Component
class TokenGenerator(
    @Value("\${spring.security.secret}")
    private val secretKey: String,

    @Value("\${spring.security.expiration}")
    private val expiration: Long
) {
    private val key: Key by lazy {
        Keys.hmacShaKeyFor(io.jsonwebtoken.io.Decoders.BASE64.decode(secretKey))
    }

    fun generateToken(authentication: Authentication): String {
        val userDetails: CustomUserDetails = authentication.principal as CustomUserDetails
        val now = Instant.now()

        return Jwts.builder()
            .subject(userDetails.getEmail().toString())
            .issuedAt(Date.from(now))
            .expiration(Date.from(now.plusMillis(expiration)))
            .signWith(key)
            .compact()
    }
}
