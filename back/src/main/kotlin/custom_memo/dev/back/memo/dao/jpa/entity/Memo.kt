package custom_memo.dev.back.memo.dao.jpa.entity

import custom_memo.dev.back.auth.dao.jpa.entity.Member
import custom_memo.dev.back.common.dao.BaseTimeEntity
import custom_memo.dev.back.common.exception.CommonException
import custom_memo.dev.back.common.exception.ErrorCode
import jakarta.persistence.*

@Entity
open class Memo(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    open val id: Long? = null,

    @Column
    open var title: String,

    @Column(columnDefinition = "TEXT")
    open var content: String,

    @Column
    @Enumerated(EnumType.STRING)
    open var color: MemoColor = MemoColor.WHITE,

    @Column
    open var favorite: Boolean = false,

    @Column
    @Enumerated(EnumType.STRING)
    open var status: MemoStatus = MemoStatus.TODO,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", foreignKey = ForeignKey(ConstraintMode.NO_CONSTRAINT))
    open var member: Member? = null
) : BaseTimeEntity() {

    protected constructor() : this(null, "", "", MemoColor.WHITE, false, MemoStatus.TODO, null)

    constructor(
        title: String,
        content: String,
        color: String,
        favorite: Boolean,
        member: Member,
        status: String
    ) : this(
        null,
        title,
        content,
        MemoColor.valueOf(color.uppercase()),
        favorite,
        MemoStatus.valueOf(status.uppercase()),
        member
    )

    fun update(
        title: String?,
        content: String?,
        color: String?,
        favorite: Boolean?,
        status: MemoStatus?
    ) {
        if (title?.isBlank() == true || content?.isBlank() == true) {
            throw CommonException(ErrorCode.INVALID_ARGUMENT)
        }
        title?.let { this.title = it }
        content?.let { this.content = it }
        color?.let { this.color = MemoColor.valueOf(it.uppercase()) }
        favorite?.let { this.favorite = it }
        status?.let { this.status = it }
    }

    fun validateMember(memberId: Long) {
        if (member?.id != memberId) {
            throw CommonException(ErrorCode.ACCESS_DENIED)
        }
    }
}
