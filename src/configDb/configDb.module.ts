import { FactoryProvider, Module, Scope } from "@nestjs/common"
import { REQUEST } from "@nestjs/core"
import { ConfigDbClient } from "./configDb.service"
import { DurableContext } from "src/utils/DurableContext"
import { REQUEST_CONTEXT_ID } from "@nestjs/core/router/request/request-constants"

export const dbClientProvider: FactoryProvider<ConfigDbClient> = {
  provide: ConfigDbClient,
  scope: Scope.REQUEST,
  durable: true,
  useFactory: (req: DurableContext) => {
    if (!req.tenantId) {
      throw new Error("tenantId not found")
    }
    return new ConfigDbClient(req.tenantId)

    // the magic work around
    // if (!req[REQUEST_CONTEXT_ID].payload.tenantId) {
    //   throw new Error("tenantId not found")
    // }
    // return new ConfigDbClient(req[REQUEST_CONTEXT_ID].payload.tenantId)
  },
  inject: [REQUEST],
}

@Module({
  providers: [dbClientProvider],
  exports: [ConfigDbClient],
  controllers: [],
})
export class DbModule {}
