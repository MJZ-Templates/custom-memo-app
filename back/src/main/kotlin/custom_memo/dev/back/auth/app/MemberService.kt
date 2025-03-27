package custom_memo.dev.back.auth.app

import custom_memo.dev.back.auth.app.dto.MemberDto
import custom_memo.dev.back.auth.dao.MemberRepository
import custom_memo.dev.back.auth.dao.jpa.entity.Member
import custom_memo.dev.back.common.dto.CommonSuccess
import custom_memo.dev.back.common.exception.CommonException
import custom_memo.dev.back.common.exception.ErrorCode
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class MemberService(private val memberRepository: MemberRepository) {

    fun save(member: Member): Member = memberRepository.save(member)

    fun findMember(id: Long): Member = memberRepository.findByIdOrNull(id)
        ?: throw CommonException(ErrorCode.NOT_FOUND_MEMBER)

    fun getMember(id: Long): MemberDto {
        val member = findMember(id)
        return MemberDto(member.id!!, member.email, member.name)
    }

    fun findMemberByEmail(email: String): Member = memberRepository.findByEmail(email)
        ?: throw CommonException(ErrorCode.NOT_FOUND_MEMBER)

    fun findMemberByEmailOrNull(username: String): Member? = memberRepository.findByEmail(username)

    fun validateEmail(email: String): CommonSuccess {
        return memberRepository.existsByEmail(email)
            .takeIf { !it }
            ?.let { CommonSuccess.success() }
            ?: CommonSuccess.fail()
    }
}
