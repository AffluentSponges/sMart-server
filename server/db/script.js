const init = require('./init')
const seed = require('./seed')

const cmd = process.argv[2]
const env = process.argv[3]

if(cmd === 'seed') {
  var initialzing = true
  seed(env, true)
}
if(cmd === 'init') {
  init(env)
}
if(cmd === 'all') {
  var initialzing = true

  init(env)
  .then(() => {
    seed(env, true)
  })
}