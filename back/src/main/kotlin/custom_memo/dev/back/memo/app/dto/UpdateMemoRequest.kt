package custom_memo.dev.back.memo.app.dto

import custom_memo.dev.back.memo.dao.jpa.entity.MemoStatus

data class UpdateMemoRequest(val title: String?, val content: String?, val color: String?, val favorite: Boolean?, val status: MemoStatus?)
