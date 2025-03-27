package custom_memo.dev.back.memo.dao.jpa

import custom_memo.dev.back.memo.dao.jpa.entity.Memo
import org.springframework.data.jpa.repository.JpaRepository

interface MemoRepository: JpaRepository<Memo, Long> {

    fun findAllByMemberId(memberId: Long): List<Memo>
}