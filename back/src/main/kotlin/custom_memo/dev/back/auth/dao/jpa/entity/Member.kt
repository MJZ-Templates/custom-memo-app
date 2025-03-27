package custom_memo.dev.back.auth.dao.jpa.entity

import jakarta.persistence.*

@Entity
open class Member(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    open var id: Long?,

    @Column
    open var name: String,

    @Column
    open val email: String,

    @Column
    open val password: String
) {
    constructor() : this(null, "", "", "") {

    }
}
