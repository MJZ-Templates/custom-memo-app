package custom_memo.dev.back.common.exception

import custom_memo.dev.back.common.dto.ResponseDto
import jakarta.servlet.http.HttpServletResponse
import mu.KotlinLogging
import org.springframework.http.HttpStatus
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.HttpRequestMethodNotSupportedException
import org.springframework.web.bind.MissingServletRequestParameterException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException
import org.springframework.web.servlet.NoHandlerFoundException

private val logger = KotlinLogging.logger {}

@RestControllerAdvice
class GlobalExceptionHandler {


    @ExceptionHandler(HttpMessageNotReadableException::class)
    fun handleHttpMessageNotReadableException(e: HttpMessageNotReadableException): ResponseDto<Any?> {
        logger.error { "handleHttpMessageNotReadableException: ${e.message}" }
        return ResponseDto.fail(CommonException(ErrorCode.BAD_REQUEST_JSON))
    }

    // Exception thrown when an unsupported HTTP method is used
    @ExceptionHandler(NoHandlerFoundException::class, HttpRequestMethodNotSupportedException::class)
    fun handleNoPageFoundException(e: Exception): ResponseDto<Any?> {
        logger.error { "handleNoPageFoundException: ${e.message}" }
        return ResponseDto.fail(CommonException(ErrorCode.NOT_FOUND_END_POINT))
    }

    // Exception thrown when the method argument type does not match
    @ExceptionHandler(MethodArgumentTypeMismatchException::class)
    fun handleArgumentNotValidException(e: MethodArgumentTypeMismatchException): ResponseDto<Any?> {
        logger.error { "handleArgumentNotValidException: ${e.message}" }
        return ResponseDto.fail(e)
    }

    // Exception thrown when a required parameter is missing
    @ExceptionHandler(MissingServletRequestParameterException::class)
    fun handleArgumentNotValidException(e: MissingServletRequestParameterException): ResponseDto<Any?> {
        logger.error { "handleArgumentNotValidException (Missing Parameter): ${e.message}" }
        return ResponseDto.fail(e)
    }

    // Exception defined by the developer
    @ExceptionHandler(CommonException::class)
    fun handleApiException(e: CommonException, response: HttpServletResponse): ResponseDto<Any?> {
        logger.error { "handleApiException: ${e.message}" }
        response.status = e.errorCode.httpStatus.value()
        return ResponseDto.fail(e)
    }

    // Server and database-related exceptions
    @ExceptionHandler(Exception::class)
    fun handleException(e: Exception, response: HttpServletResponse): ResponseDto<Any?> {
        logger.error { "handleException: ${e.message}" }
        e.printStackTrace()
        response.status = HttpStatus.INTERNAL_SERVER_ERROR.value()
        return ResponseDto.fail(CommonException(ErrorCode.INTERNAL_SERVER_ERROR))
    }
}