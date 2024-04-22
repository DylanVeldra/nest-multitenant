import { NestFactory, ContextIdFactory } from "@nestjs/core"
import { MultiTenantContextIdStrategy } from "./utils/tenant-context-id.strategy"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  })

  ContextIdFactory.apply(new MultiTenantContextIdStrategy())

  await app.listen(process.env.PORT || 8080)
}
bootstrap()
