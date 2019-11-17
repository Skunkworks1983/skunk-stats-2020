const {
  RateLimiterMemory
} = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 1,

})

const rateLimiterMiddle = (req, res, next) => {
  rateLimiter.consume(res.ip, 2)
    .then((rateLimiterRes) => {
      next();
    })
    .catch((rateLimiterRes) => {
      res.status(429).send('Too many requests');
    })
}

module.exports = rateLimiterMiddle;