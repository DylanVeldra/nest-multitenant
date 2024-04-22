import { Controller, Get, UseGuards } from "@nestjs/common"
import { KazService } from "./kaz.service"
import { JwtGuard } from "src/guard"

@UseGuards(JwtGuard)
@Controller("kaz")
export class KazController {
  constructor(private readonly fooService: KazService) {}

  @Get()
  greeting(): string {
    return this.fooService.getJwtPrivateKey()
  }
}
