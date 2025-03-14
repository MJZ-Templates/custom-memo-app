package custom_memo.dev.back.common.web.ui

import custom_memo.dev.back.common.dto.ResponseDto
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class HealthCheckController {

    @GetMapping
    fun healthCheck(): ResponseDto<String?> {
        return ResponseDto.ok("OK")
    }
}