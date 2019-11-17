const config = {
  production: false,
  hostname: (this.production) ? 'https://73.109.240.48:1983' : 'http://127.0.0.1:3000'
}

module.exports = config;