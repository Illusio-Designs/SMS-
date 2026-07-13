import { createApp } from './app.js'
import { env } from './config/env.js'
import { closeAll } from './config/db.js'

const app = createApp()

const server = app.listen(env.port, () => {
  console.log(`Scholr API listening on http://localhost:${env.port} (${env.nodeEnv})`)
})

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => {
    server.close(async () => { await closeAll(); process.exit(0) })
  })
}
