import { Inject, Injectable } from "@nestjs/common"
import { REQUEST } from "@nestjs/core"
import { REQUEST_CONTEXT_ID } from "@nestjs/core/router/request/request-constants"
import { ConfigDbClient } from "src/configDb/configDb.service"
import { RequestContext } from "src/utils/RequestContext"

@Injectable()
export class KazService {
  constructor(
    @Inject(REQUEST) private readonly request: RequestContext,
    private readonly configDb: ConfigDbClient
  ) {}

  getJwtPrivateKey() {
    // the tree is not durable because of line 9 "@Inject(REQUEST)..."
    // this.request.tenantId is undefined since it is contextId.payload is ignored because the tree is not durable cf: @nestjs/packages/core/router/router-explorer.ts line 421

    // or should we use this work around ?
    // this.request[REQUEST_CONTEXT_ID].payload.tenantId

    console.log(
      `The user ${this.request.context.user.firstname} check tenant's config ${this.request.tenantId}`
    )
    return this.configDb.getConfig().jwkPrivateKey
  }
}
