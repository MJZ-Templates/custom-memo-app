package custom_memo.dev.back.auth.domain

import custom_memo.dev.back.auth.dao.jpa.entity.Member
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class CustomUserDetails(private val member: Member) : UserDetails {

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf()
    }

    override fun getPassword(): String {
        return member.password
    }

    override fun getUsername(): String {
        return member.email
    }

    fun getId(): Long {
        return member.id!!
    }

    fun getEmail(): String {
        return member.email
    }
}