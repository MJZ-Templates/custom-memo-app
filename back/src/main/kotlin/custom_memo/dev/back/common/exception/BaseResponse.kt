package custom_memo.dev.back.common.exception

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty

data class BaseResponse<T>(

    @JsonProperty("is_success")
    var isSuccess: Boolean,

    var code: String,
    var message: String,

    @JsonInclude(JsonInclude.Include.NON_NULL)
    var data: T?
) {

    companion object {
        fun <T> onSuccess(data: T?): BaseResponse<T?> =
            BaseResponse(true, "200", "Request success", null)

        fun <T> onSuccess(data: List<T>): BaseResponse<List<T>> =
            BaseResponse(true, "200", "Request success", data)

        fun <T> onSuccess(code: BaseResponseStatus, data: T?): BaseResponse<T> =
            BaseResponse(true, code.name, code.message, data)

        fun <T> onFailure(code: BaseResponseStatus, data: T?): BaseResponse<T> =
            BaseResponse(false, code.name, code.message, data)
    }
}