package custom_memo.dev.back.common.dto

import com.fasterxml.jackson.annotation.JsonIgnore
import custom_memo.dev.back.common.exception.CommonException
import custom_memo.dev.back.common.exception.ErrorCode
import org.springframework.http.HttpStatus
import org.springframework.web.bind.MissingServletRequestParameterException
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException

data class ResponseDto <T>(
    @JsonIgnore
    val httpStatus: HttpStatus,
    val success: Boolean,
    val data: T,
    val error: ExceptionDto ?
) {
    companion object {
        fun <T> ok(data: T): ResponseDto<T> = ResponseDto(HttpStatus.OK, success = true, data = data, error = null)

        fun <T> created(data: T) : ResponseDto<T> = ResponseDto(HttpStatus.CREATED, success = true, data = data, error = null)

        fun fail(e: MissingServletRequestParameterException): ResponseDto<Any?> =
            ResponseDto(HttpStatus.BAD_REQUEST, success = false, data = null, error = ExceptionDto.of(ErrorCode.MISSING_REQUEST_PARAMETER))

        fun fail(e: MethodArgumentTypeMismatchException): ResponseDto<Any?> =
            ResponseDto(HttpStatus.BAD_REQUEST, success = false, data = null, error = ExceptionDto.of(ErrorCode.INVALID_PARAMETER_FORMAT))

        fun fail(e: CommonException): ResponseDto<Any?> =
            ResponseDto(HttpStatus.BAD_REQUEST, success = false, data = null, error = ExceptionDto.of(e.errorCode))
    }
}
