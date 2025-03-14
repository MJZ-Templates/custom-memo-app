package custom_memo.dev.back.memo.app.dto

import custom_memo.dev.back.memo.dao.jpa.entity.Memo

data class CreateMemoRequest(val title: String, val content: String) {
    fun of() = Memo(title, content)
}
