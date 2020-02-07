const production = true;
const hostname = production ? window.location.origin : 'http://127.0.0.1:1983';

module.exports = {
  production,
  hostname
};