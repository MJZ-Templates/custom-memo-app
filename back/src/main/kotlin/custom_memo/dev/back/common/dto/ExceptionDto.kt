package custom_memo.dev.back.common.dto

import custom_memo.dev.back.common.exception.ErrorCode

data class ExceptionDto(
    val code: Int,
    val message: String
) {
    companion object {
        fun of(errorCode: ErrorCode) = ExceptionDto(errorCode.code, errorCode.message)
    }
}
