import { Controller, Get, UseGuards } from "@nestjs/common"
import { FooService } from "./foo.service"
import { JwtGuard } from "src/guard"

@UseGuards(JwtGuard)
@Controller("foo")
export class FooController {
  constructor(private readonly fooService: FooService) {}

  @Get()
  greeting(): string {
    return this.fooService.getJwtPublicKey()
  }
}
