package custom_memo.dev.back.auth.ui

import custom_memo.dev.back.auth.app.MemberService
import custom_memo.dev.back.auth.app.dto.MemberDto
import custom_memo.dev.back.common.dto.ResponseDto
import custom_memo.dev.back.config.security.annotation.Auth
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/member")
class MemberController(private val memberService: MemberService) {

    @GetMapping
    fun getMember(@Auth memberId: Long): ResponseDto<MemberDto>  {
        return ResponseDto.ok(memberService.getMember(memberId))
    }
}