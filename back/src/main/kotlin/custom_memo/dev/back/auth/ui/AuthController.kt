package custom_memo.dev.back.auth.ui

import custom_memo.dev.back.auth.app.AuthService
import custom_memo.dev.back.auth.app.dto.AuthRequestDto
import custom_memo.dev.back.auth.app.dto.TokenDto
import custom_memo.dev.back.common.dto.CommonSuccess
import custom_memo.dev.back.common.dto.ResponseDto
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
class AuthController(private val authService: AuthService) {

    @PostMapping("/login")
    fun login(@RequestBody dto: AuthRequestDto): ResponseDto<TokenDto> {
        return ResponseDto.ok(authService.login(dto))
    }

    @PostMapping("/register")
    fun register(@RequestBody dto: AuthRequestDto): ResponseDto<CommonSuccess> {
        return ResponseDto.created(authService.register(dto))
    }
}