import { Module } from "@nestjs/common"
import { FooController } from "./foo/foo.controller"
import { KazController } from "./kaz/kaz.controller"
import { KazService } from "./kaz/kaz.service"
import { FooService } from "./foo/foo.service"
import { DbModule } from "./configDb/configDb.module"

@Module({
  imports: [DbModule],
  providers: [FooService, KazService],
  controllers: [FooController, KazController],
})
export class AppModule {}
