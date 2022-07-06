const restify = require('restify')
const userHandler = require('../modules/user/handlers/api_handler')

function AppServer() {
  this.server = restify.createServer({
    name: 'nodejs-rest-api',
    version: '1.0',
  })

  /**
   * pre()
   * handler chain executed before routing.
   * this will be executed for an incoming request
   * even if it's for a route that did not registered
   */
  this.server.pre(restify.plugins.pre.userAgentConnection())

  /**
   * use()
   * handler chain executed after routing
   * this will be running for all routes
   * make sure all use() handler chain happen before any routes
   */
  this.server.use((req, res, next) => {
    console.warn('run for all routes')
    return next()
  })
  this.server.use(restify.plugins.acceptParser(this.server.acceptable))
  this.server.use(restify.plugins.queryParser())
  this.server.use(restify.plugins.bodyParser({ multiples: true }))

  this.server.get('/', (req, res) => {
    res.send(200, "this service is running properly")
  })

  const helloHandlerV1 = (req, res, next) => {
    res.send('hello' + req.params.name)
    return next()
  }
  const helloHandlerV2 = (req, res, next) => {
    res.send({ hello: req.params.name })
    return next()
  }
  this.server.get('/hello/:name', restify.plugins.conditionalHandler([
    { version: "1.3.2", handler: helloHandlerV1 },
    { version: "2.0.0", handler: helloHandlerV2 },
  ]))

  this.server.post('/api/user/v1/users/auth', userHandler.authUser)
  this.server.post('/api/user/v1/users/register', userHandler.registerUser)
}

module.exports = AppServer