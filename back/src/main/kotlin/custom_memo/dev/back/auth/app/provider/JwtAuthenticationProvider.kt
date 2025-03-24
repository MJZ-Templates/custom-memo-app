package custom_memo.dev.back.auth.app.provider

import custom_memo.dev.back.auth.domain.JwtAuthenticationToken
import io.jsonwebtoken.Jwts
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetailsService
import javax.crypto.SecretKey

class JwtAuthenticationProvider(
    private val userDetailsService: UserDetailsService,
    private val secretKey: SecretKey) : AuthenticationProvider {

    override fun authenticate(authentication: Authentication?): Authentication {
        var token = authentication?.principal as String
        token = removePrefix(token)
        val parsedToken = Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token)

        val claims = parsedToken.payload
        val userId = claims.subject

        val userDetails = userDetailsService.loadUserByUsername(userId)
        return UsernamePasswordAuthenticationToken(userDetails, null, listOf(SimpleGrantedAuthority("ROLE_USER")))
    }

    override fun supports(authentication: Class<*>?): Boolean {
        return JwtAuthenticationToken::class.java.isAssignableFrom(authentication!!)
    }

    private fun removePrefix(token: String): String {
        return token.replace("Bearer ", "")
    }
}