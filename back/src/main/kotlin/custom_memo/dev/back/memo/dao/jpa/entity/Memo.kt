package custom_memo.dev.back.memo.dao.jpa.entity

import custom_memo.dev.back.common.dao.BaseTimeEntity
import jakarta.persistence.*

@Entity
class Memo(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column
    var title: String,

    @Column(columnDefinition = "TEXT")
    var content: String
) : BaseTimeEntity() {
    constructor() : this(null, "", "")
    constructor(title: String, content: String) : this(null, title, content)
}
