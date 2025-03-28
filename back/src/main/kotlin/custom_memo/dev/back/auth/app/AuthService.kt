package custom_memo.dev.back.auth.app

import custom_memo.dev.back.auth.app.dto.AuthRequestDto
import custom_memo.dev.back.auth.app.dto.LoginRequestDto
import custom_memo.dev.back.auth.app.dto.TokenDto
import custom_memo.dev.back.auth.dao.jpa.entity.Member
import custom_memo.dev.back.common.dto.CommonSuccess
import custom_memo.dev.back.common.exception.CommonException
import custom_memo.dev.back.common.exception.ErrorCode
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val tokenGenerator: TokenGenerator,
    private val memberService: MemberService,
    private val authenticationManager: AuthenticationManager,
    val passwordEncoder: PasswordEncoder
) {

    fun login(dto: LoginRequestDto): TokenDto {
        val authentication = UsernamePasswordAuthenticationToken(dto.email, dto.password)
        val authenticatedToken = authenticationManager.authenticate(authentication)
        val generateToken = tokenGenerator.generateToken(authenticatedToken)

        return TokenDto(generateToken)
    }

    fun register(dto: AuthRequestDto): CommonSuccess {
        memberService.findMemberByEmailOrNull(dto.email)
            ?: Member(null, dto.name, dto.email, passwordEncoder.encode(dto.password))
                .let { memberService.save(it) }
                .let { return CommonSuccess.success() }
        throw CommonException(ErrorCode.ALREADY_EXIST_MEMBER)
    }
}
