const router = require('express').Router();
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ 
    dev: dev,
    dir: './green-code-data',
    conf: require('../green-code-data/next.config')
  });
const handle = app.getRequestHandler()

app.prepare().then(() => {
  router.all('*', (req, res) => {
      handle(req, res);
  });
})

module.exports = router;