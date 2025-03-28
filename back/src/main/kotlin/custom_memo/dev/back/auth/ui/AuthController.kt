package custom_memo.dev.back.auth.ui

import custom_memo.dev.back.auth.app.AuthService
import custom_memo.dev.back.auth.app.MemberService
import custom_memo.dev.back.auth.app.dto.AuthRequestDto
import custom_memo.dev.back.auth.app.dto.LoginRequestDto
import custom_memo.dev.back.auth.app.dto.TokenDto
import custom_memo.dev.back.common.dto.CommonSuccess
import custom_memo.dev.back.common.dto.ResponseDto
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authService: AuthService,
    private val memberService: MemberService) {

    @PostMapping("/login")
    fun login(@RequestBody dto: LoginRequestDto): ResponseDto<TokenDto> {
        return ResponseDto.ok(authService.login(dto))
    }

    @PostMapping("/register")
    fun register(@RequestBody dto: AuthRequestDto): ResponseDto<CommonSuccess> {
        return ResponseDto.created(authService.register(dto))
    }

    @GetMapping("/email")
    fun validateEmail(@RequestParam("email") email: String): ResponseDto<CommonSuccess> {
        return ResponseDto.ok(memberService.validateEmail(email))
    }
}
