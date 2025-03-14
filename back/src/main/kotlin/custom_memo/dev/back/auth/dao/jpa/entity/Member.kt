package custom_memo.dev.back.auth.dao.jpa.entity

import jakarta.persistence.*

@Entity
class Member(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long?,

    @Column
    val username: String,

    @Column
    val email: String,

    @Column
    val password: String
) {
    constructor() : this(null, "", "", "") {

    }
}