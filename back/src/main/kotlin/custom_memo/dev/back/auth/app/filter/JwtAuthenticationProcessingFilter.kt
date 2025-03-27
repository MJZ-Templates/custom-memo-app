package custom_memo.dev.back.auth.app.filter

import custom_memo.dev.back.auth.domain.JwtAuthenticationToken
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.OncePerRequestFilter

class JwtAuthenticationProcessingFilter(private val authenticationManager: AuthenticationManager) :
    OncePerRequestFilter() {
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        getToken(request)?.let { setAuthentication(it) }
        filterChain.doFilter(request, response)
    }

    private fun setAuthentication(token: String) {
        val unAuthentication = JwtAuthenticationToken(token)
        SecurityContextHolder.getContextHolderStrategy().context.authentication =
            authenticationManager.authenticate(unAuthentication)
    }

    private companion object {
        @JvmStatic
        private fun getToken(request: HttpServletRequest): String? {
            return request.getHeader("Authorization")
        }
    }
}
