const proxy = require('http-proxy-middleware')
const packageJson = require('../package.json')

module.exports = function expressMiddleware(router) {
  const path = '/rollout'
  const proxier = proxy(`${packageJson.proxy}${path}`)
  router.use(path, proxier)
}

