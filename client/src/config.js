const production = false
const hostname = (production) ? 'https://73.109.240.48:1983' : 'http://127.0.0.1:1983'

module.exports = {
  production,
  hostname
};