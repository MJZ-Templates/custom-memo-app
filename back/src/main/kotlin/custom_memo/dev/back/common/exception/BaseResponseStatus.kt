package custom_memo.dev.back.common.exception

import org.springframework.http.HttpStatus

enum class BaseResponseStatus(val httpStatus: HttpStatus, val message: String) {
    SUCCESS(HttpStatus.OK, "성공"),
}