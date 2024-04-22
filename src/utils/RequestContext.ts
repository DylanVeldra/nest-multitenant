import { User } from "src/models/User"
import { DurableContext } from "./DurableContext"

export type RequestContext = Request &
  DurableContext & {
    context: {
      user: User
    }
  }
