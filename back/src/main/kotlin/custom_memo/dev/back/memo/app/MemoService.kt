package custom_memo.dev.back.memo.app

import custom_memo.dev.back.auth.app.MemberService
import custom_memo.dev.back.common.dto.CommonSuccess
import custom_memo.dev.back.common.exception.CommonException
import custom_memo.dev.back.common.exception.ErrorCode
import custom_memo.dev.back.memo.app.dto.CreateMemoRequest
import custom_memo.dev.back.memo.app.dto.GetMemoResponse
import custom_memo.dev.back.memo.app.dto.UpdateMemoRequest
import custom_memo.dev.back.memo.dao.jpa.MemoRepository
import custom_memo.dev.back.memo.dao.jpa.entity.Memo
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class MemoService(
    private val memoRepository: MemoRepository,
    private val memberService: MemberService) {

    fun findMemo(id: Long): Memo = memoRepository.findByIdOrNull(id)
        ?: throw CommonException(ErrorCode.NOT_FOUND_MEMO)

    fun createMemo(memberId: Long, dto: CreateMemoRequest): CommonSuccess {
        val member = memberService.findMember(memberId)
        Memo(dto.title, dto.content, dto.color, dto.favorite, member)
            .let { memoRepository.save(it) }

        return CommonSuccess.success()
    }

    @Transactional(readOnly = true)
    fun getMemos(memberId: Long): List<GetMemoResponse> {
        return memoRepository.findAllByMemberId(memberId).stream()
            .map { memo -> GetMemoResponse.of(
                memo.id,
                memo.title,
                memo.content,
                memo.favorite,
                memo.color,
                memo.status,
                memo.createdDate,
                memo.modifiedDate) }
            .toList()
    }

    @Transactional(readOnly = true)
    fun getMemo(id: Long): GetMemoResponse {
        val memo = findMemo(id)
        return GetMemoResponse.of(
            memo.id,
            memo.title,
            memo.content,
            memo.favorite,
            memo.color,
            memo.status,
            memo.createdDate,
            memo.modifiedDate)
    }

    fun deleteMemo(memberId: Long, id: Long): CommonSuccess {
        findMemo(id).validateMember(memberId)
        memoRepository.deleteById(id)

        return CommonSuccess.success()
    }

    fun updateMemo(memberId: Long, id: Long, dto: UpdateMemoRequest): CommonSuccess {
        val memo = findMemo(id)
        memo.validateMember(memberId)
        memo.update(dto.title, dto.content, dto.color, dto.favorite, dto.status)

        return CommonSuccess.success()
    }
}
