import {
  ContextId,
  ContextIdFactory,
  ContextIdStrategy,
  HostComponentInfo,
} from "@nestjs/core"
import { Request } from "express"
import { DurableContext } from "./DurableContext"

const tenants = new Map<string, ContextId>()

export class MultiTenantContextIdStrategy implements ContextIdStrategy {
  attach(contextId: ContextId, request: Request) {
    const tenantId = request.headers["x-tenant-id"] as string
    let tenantSubTreeId: ContextId

    if (tenants.has(tenantId)) {
      tenantSubTreeId = tenants.get(tenantId) as ContextId
    } else {
      tenantSubTreeId = ContextIdFactory.create()
      tenants.set(tenantId, tenantSubTreeId)
    }

    // The logic to retrieve the tenantId will be always executed, but will be provided only if isTreeDurable === true
    return {
      resolve: (info: HostComponentInfo) =>
        info.isTreeDurable ? tenantSubTreeId : contextId,
      payload: { tenantId } satisfies DurableContext,
    }
  }
}
