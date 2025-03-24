package custom_memo.dev.back.auth.domain

import org.springframework.security.authentication.AbstractAuthenticationToken

class JwtAuthenticationToken(private val token: String) : AbstractAuthenticationToken(null) {
    override fun getPrincipal(): Any = token

    override fun getCredentials(): Any? = null
}