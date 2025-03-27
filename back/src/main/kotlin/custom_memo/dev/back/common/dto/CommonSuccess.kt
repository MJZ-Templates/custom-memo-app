package custom_memo.dev.back.common.dto

data class CommonSuccess(val isSuccess: Boolean) {

    companion object {
        fun success() = CommonSuccess(true)

        fun fail() = CommonSuccess(false)
    }
}
