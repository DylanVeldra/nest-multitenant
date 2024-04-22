import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { RequestContext } from "./utils/RequestContext"
import { ConfigDbClient } from "./configDb/configDb.service"

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly configDb: ConfigDbClient) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestContext>()

    // simplified for demonstration but normally we should
    // retrieve jwt from request

    const jwtPublicKey = this.configDb.getConfig().jwkPublicKey
    console.log(`Using public key ${jwtPublicKey} to verify jwt`)

    // verify jwt

    // add to the request context some user info that may be used by the app if the singleton using REQUEST isn't durable, if the the
    request.context = {
      user: {
        firstname: "BOBR",
      },
    }

    return true
  }
}
