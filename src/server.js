require('svelte/register')({
  hydratable: true,
});
const express = require('express');
const { template } = require('./template');

const app = express();

const pageProps = {
  app: {
    getProps: () => ({
      name: 'Yishai',
    }),
  },
  about: {
    getProps: () => ({}),
  },
};

app.get('/views/:page', (req, res) => {
  const props = pageProps[req.params.page]?.getProps() || {};

  res.send(template(req.params.page, props));
});

app.listen(3000, () => {
  console.log('App started on port 3000');
});
