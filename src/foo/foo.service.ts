import { Inject, Injectable, Scope } from "@nestjs/common"
import { REQUEST } from "@nestjs/core"
import { ConfigDbClient } from "src/configDb/configDb.service"
import { RequestContext } from "src/utils/RequestContext"

@Injectable()
export class FooService {
  constructor(private readonly configDb: ConfigDbClient) {}

  getJwtPublicKey() {
    return this.configDb.getConfig().jwkPublicKey
  }
}
