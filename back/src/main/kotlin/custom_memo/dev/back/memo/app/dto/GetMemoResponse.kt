package custom_memo.dev.back.memo.app.dto

import custom_memo.dev.back.memo.dao.jpa.entity.MemoColor
import custom_memo.dev.back.memo.dao.jpa.entity.MemoStatus
import java.time.LocalDateTime

data class GetMemoResponse(
    val id: Long?,
    val title: String,
    val content: String,
    val favorite: Boolean,
    val color: String,
    val status: String,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime
) {
    companion object {
        fun of(
            id: Long?,
            title: String,
            content: String,
            favorite: Boolean,
            color: MemoColor,
            status: MemoStatus,
            createdAt: LocalDateTime,
            updatedAt: LocalDateTime
        ) = GetMemoResponse(id, title, content, favorite, color.name, status.name, createdAt, updatedAt)
    }
}
