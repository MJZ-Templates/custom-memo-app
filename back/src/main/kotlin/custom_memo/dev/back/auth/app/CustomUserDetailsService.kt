package custom_memo.dev.back.auth.app

import custom_memo.dev.back.auth.domain.CustomUserDetails
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Component

@Component
class CustomUserDetailsService(private val memberService: MemberService): UserDetailsService {

    override fun loadUserByUsername(email: String): UserDetails {
        memberService.findMemberByEmail(email).let {
            return CustomUserDetails(it)
        }
    }
}