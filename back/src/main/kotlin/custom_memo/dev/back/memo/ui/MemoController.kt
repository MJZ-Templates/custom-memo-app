package custom_memo.dev.back.memo.ui

import custom_memo.dev.back.common.dto.CommonSuccess
import custom_memo.dev.back.common.dto.ResponseDto
import custom_memo.dev.back.config.security.annotation.Auth
import custom_memo.dev.back.memo.app.MemoService
import custom_memo.dev.back.memo.app.dto.CreateMemoRequest
import custom_memo.dev.back.memo.app.dto.GetMemoResponse
import custom_memo.dev.back.memo.app.dto.UpdateMemoRequest
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/memo")
class MemoController(private val memoService: MemoService) {

    @PostMapping
    fun createMemo(@Auth memberId: Long, @RequestBody dto: CreateMemoRequest): ResponseDto<CommonSuccess> {
        return ResponseDto.created(memoService.createMemo(memberId, dto))
    }

    @GetMapping
    fun getMemos(@Auth memberId: Long): ResponseDto<List<GetMemoResponse>> {
        return ResponseDto.ok(memoService.getMemos(memberId))
    }

    @GetMapping("/{id}")
    fun getMemo(@PathVariable("id") id: Long): ResponseDto<GetMemoResponse> {
        return ResponseDto.ok(memoService.getMemo(id))
    }

    @DeleteMapping("/{id}")
    fun deleteMemo(@Auth memberId: Long, @PathVariable("id") id: Long): ResponseDto<CommonSuccess> {
        return ResponseDto.ok(memoService.deleteMemo(memberId, id))
    }

    @PatchMapping("/{id}")
    fun updateMemo(@Auth memberId: Long, @PathVariable("id") id: Long, @RequestBody dto: UpdateMemoRequest): ResponseDto<CommonSuccess> {
        return ResponseDto.ok(memoService.updateMemo(memberId, id, dto))
    }
}