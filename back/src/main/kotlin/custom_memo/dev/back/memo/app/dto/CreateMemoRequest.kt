package custom_memo.dev.back.memo.app.dto

data class CreateMemoRequest(val title: String, val content: String, val color: String, val favorite: Boolean, val status: String)
