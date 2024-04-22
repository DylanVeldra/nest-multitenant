import { Injectable } from "@nestjs/common"

export type Config = {
  jwkPublicKey: string
  jwkPrivateKey: string
}

const configs: Record<string, Config> = {
  BAR: {
    jwkPublicKey: "BAR_JWT_Public_Key...",
    jwkPrivateKey: "BAR_JWT_Private_Key...",
  },
  BAZ: {
    jwkPublicKey: "BAZ_JWT_Public_Key...",
    jwkPrivateKey: "BAZ_JWT_Private_Key...",
  },
}

@Injectable()
export class ConfigDbClient {
  constructor(private readonly tenantId: string) {}

  getConfig() {
    return configs[this.tenantId]
  }
}
