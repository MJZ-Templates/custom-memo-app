package custom_memo.dev.back.memo.dao.jpa.entity

import custom_memo.dev.back.common.dao.BaseTimeEntity
import custom_memo.dev.back.common.exception.CommonException
import custom_memo.dev.back.common.exception.ErrorCode
import jakarta.persistence.*

@Entity
class Memo(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column
    var title: String,

    @Column(columnDefinition = "TEXT")
    var content: String,

    @Column
    var color: MemoColor = MemoColor.WHITE,

    @Column
    var favorite: Boolean = false

) : BaseTimeEntity() {
    constructor() : this(null, "", "", MemoColor.WHITE, false)
    constructor(title: String, content: String, color: String, favorite: Boolean) : this(
        null,
        title,
        content,
        MemoColor.valueOf(color.uppercase()),
        favorite
    )

    fun update(title: String?, content: String?, color: String?, favorite: Boolean?) {
        if (title?.isBlank() == true || content?.isBlank() == true) {
            throw CommonException(ErrorCode.INVALID_ARGUMENT)
        }
        title?.let { this.title = it }
        content?.let { this.content = it }
        color?.let { this.color = MemoColor.valueOf(it.uppercase()) }
        favorite?.let { this.favorite = it }
    }
}
