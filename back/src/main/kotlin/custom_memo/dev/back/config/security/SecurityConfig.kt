package custom_memo.dev.back.config.security

import custom_memo.dev.back.auth.app.filter.JwtAuthenticationProcessingFilter
import custom_memo.dev.back.auth.app.provider.CustomAuthenticationProvider
import custom_memo.dev.back.auth.app.provider.JwtAuthenticationProvider
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.ProviderManager
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import org.springframework.web.cors.CorsConfigurationSource
import javax.crypto.SecretKey

@Configuration
@EnableWebSecurity
class SecurityConfig {

    @Value("\${spring.security.secret}")
    private lateinit var secretKey: String

    private val key: SecretKey by lazy {
        Keys.hmacShaKeyFor(io.jsonwebtoken.io.Decoders.BASE64.decode(secretKey))
    }

    @Bean
    fun securityFilterChain(
        http: HttpSecurity,
        corsConfigurationSource: CorsConfigurationSource,
        authenticationManager: AuthenticationManager
    ): SecurityFilterChain {
        return http
            .authorizeHttpRequests {
                it.requestMatchers("/api", "/api/auth/**").permitAll()
                    .anyRequest().authenticated()
            }
            .httpBasic { it.disable() }
            .csrf { it.disable() }
            .cors { it.configurationSource(corsConfigurationSource) }
            .formLogin { it.disable() }
            .sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
            .addFilterBefore(
                JwtAuthenticationProcessingFilter(authenticationManager),
                BasicAuthenticationFilter::class.java
            )
            .build()
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    fun authenticationManager(
        userDetailsService: UserDetailsService,
        passwordEncoder: PasswordEncoder
    ): AuthenticationManager {
        return ProviderManager(
            listOf(
                CustomAuthenticationProvider(userDetailsService, passwordEncoder),
                JwtAuthenticationProvider(userDetailsService, key)
            )
        )
    }
}
