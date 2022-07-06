const AppServer = require('./bin/app/server')
const appServer = new AppServer()
const PORT = process.env.port || 3000

appServer.server.listen(PORT, () => {
  console.log(`${appServer.server.name} started, listening at ${appServer.server.url}`)
})

