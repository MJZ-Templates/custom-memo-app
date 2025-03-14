package custom_memo.dev.back.auth.dao

import custom_memo.dev.back.auth.dao.jpa.entity.Member
import org.springframework.data.jpa.repository.JpaRepository

interface MemberRepository : JpaRepository<Member, Long> {
    fun findByUsername(username: String): Member?
}