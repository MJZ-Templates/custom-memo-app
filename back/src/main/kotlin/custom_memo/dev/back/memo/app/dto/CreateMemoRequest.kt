package custom_memo.dev.back.memo.app.dto

import custom_memo.dev.back.memo.dao.jpa.entity.Memo

data class CreateMemoRequest(val title: String, val content: String, val color: String, val favorite: Boolean) {
    fun of(): Memo = Memo(title, content, color, favorite)
}
