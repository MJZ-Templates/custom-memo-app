package custom_memo.dev.back.auth.app

import custom_memo.dev.back.auth.dao.MemberRepository
import custom_memo.dev.back.auth.dao.jpa.entity.Member
import custom_memo.dev.back.common.exception.CommonException
import custom_memo.dev.back.common.exception.ErrorCode
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class MemberService(private val memberRepository: MemberRepository) {

    fun findMember(id: Long): Member = memberRepository.findByIdOrNull(id)
        ?: throw CommonException(ErrorCode.NOT_FOUND_MEMBER)

    fun findMemberByUsername(username: String): Member = memberRepository.findByUsername(username)
        ?: throw CommonException(ErrorCode.NOT_FOUND_MEMBER)
}