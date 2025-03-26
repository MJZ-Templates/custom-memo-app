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

@Service
class MemoService(private val memoRepository: MemoRepository, private val memberService: MemberService) {

    fun findMemo(id: Long): Memo = memoRepository.findByIdOrNull(id)
        ?: throw CommonException(ErrorCode.NOT_FOUND_MEMO)

    fun createMemo(dto: CreateMemoRequest): CommonSuccess {
        val memo = dto.of()
        memoRepository.save(memo)

        return CommonSuccess.success()
    }

    fun getMemos(): List<GetMemoResponse> {
        return memoRepository.findAll().stream()
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

    fun deleteMemo(id: Long): CommonSuccess {
        memoRepository.deleteById(id)

        return CommonSuccess.success()
    }

    fun updateMemo(id: Long, dto: UpdateMemoRequest): CommonSuccess {
        val memo = findMemo(id)
        memo.update(dto.title, dto.content, dto.color, dto.favorite, dto.status)

        return CommonSuccess.success()
    }
}