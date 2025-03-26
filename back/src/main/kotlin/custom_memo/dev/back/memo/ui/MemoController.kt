package custom_memo.dev.back.memo.ui

import custom_memo.dev.back.common.dto.CommonSuccess
import custom_memo.dev.back.common.dto.ResponseDto
import custom_memo.dev.back.memo.app.MemoService
import custom_memo.dev.back.memo.app.dto.CreateMemoRequest
import custom_memo.dev.back.memo.app.dto.GetMemoResponse
import custom_memo.dev.back.memo.app.dto.UpdateMemoRequest
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/memo")
class MemoController(private val memoService: MemoService) {

    @PostMapping
    fun createMemo(@RequestBody dto: CreateMemoRequest): ResponseDto<CommonSuccess> {
        return ResponseDto.created(memoService.createMemo(dto))
    }

    @GetMapping
    fun getMemos(): ResponseDto<List<GetMemoResponse>> {
        return ResponseDto.ok(memoService.getMemos())
    }

    @GetMapping("/{id}")
    fun getMemo(@PathVariable("id") id: Long): ResponseDto<GetMemoResponse> {
        return ResponseDto.ok(memoService.getMemo(id))
    }

    @DeleteMapping("/{id}")
    fun deleteMemo(@PathVariable("id") id: Long): ResponseDto<CommonSuccess> {
        return ResponseDto.ok(memoService.deleteMemo(id))
    }

    @PatchMapping("/{id}")
    fun updateMemo(@PathVariable("id") id: Long, @RequestBody dto: UpdateMemoRequest): ResponseDto<CommonSuccess> {
        return ResponseDto.ok(memoService.updateMemo(id, dto))
    }
}