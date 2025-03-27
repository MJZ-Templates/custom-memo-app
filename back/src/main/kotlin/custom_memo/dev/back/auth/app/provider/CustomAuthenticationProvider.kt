package custom_memo.dev.back.auth.app.provider

import custom_memo.dev.back.common.exception.CommonException
import custom_memo.dev.back.common.exception.ErrorCode
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder

class CustomAuthenticationProvider(
    private val userDetailsService: UserDetailsService,
    private val passwordEncoder: PasswordEncoder): AuthenticationProvider {

    override fun authenticate(authentication: Authentication?): Authentication {
        val name = authentication?.principal as String
        val password = authentication.credentials as String
        val userDetails: UserDetails = userDetailsService.loadUserByUsername(name)
        validatePassword(password, userDetails)

        return UsernamePasswordAuthenticationToken(userDetails, null)
    }

    private fun validatePassword(password: String, userDetails: UserDetails) {
        if (!passwordEncoder.matches(password, userDetails.password)) {
            throw CommonException(ErrorCode.NOT_FOUND_MEMBER)
        }
    }

    override fun supports(authentication: Class<*>?): Boolean {
        return UsernamePasswordAuthenticationToken::class.java.isAssignableFrom(authentication!!)
    }
}
