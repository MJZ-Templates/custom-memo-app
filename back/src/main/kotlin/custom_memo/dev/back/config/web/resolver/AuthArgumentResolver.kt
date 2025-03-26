package custom_memo.dev.back.config.web.resolver

import custom_memo.dev.back.auth.domain.CustomUserDetails
import custom_memo.dev.back.config.security.annotation.Auth
import org.springframework.core.MethodParameter
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.bind.support.WebDataBinderFactory
import org.springframework.web.context.request.NativeWebRequest
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.method.support.ModelAndViewContainer

@Component
class AuthArgumentResolver : HandlerMethodArgumentResolver {

    override fun supportsParameter(parameter: MethodParameter): Boolean {
        return parameter.parameterType == Long::class.java &&
                parameter.hasParameterAnnotation(Auth::class.java)
    }

    override fun resolveArgument(
        parameter: MethodParameter,
        mavContainer: ModelAndViewContainer?,
        webRequest: NativeWebRequest,
        binderFactory: WebDataBinderFactory?
    ): Any? {
        val authentication: Authentication? = SecurityContextHolder
            .getContextHolderStrategy()
            .context
            .authentication

        if (authentication == null) {
            return null
        }

        val principal = authentication.principal as CustomUserDetails
        return principal.username.toLong()
    }
}