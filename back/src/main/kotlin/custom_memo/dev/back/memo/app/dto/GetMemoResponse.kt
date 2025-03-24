package custom_memo.dev.back.memo.app.dto

import java.time.LocalDateTime

data class GetMemoResponse(
    val id: Long?,
    val title: String,
    val content: String,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime
) {
    companion object {
        fun of(id: Long?, title: String, content: String, createdAt: LocalDateTime, updatedAt: LocalDateTime) =
            GetMemoResponse(id, title, content, createdAt, updatedAt)
    }
}
