require('svelte/register')({
  hydratable: true,
});
const express = require('express');
const path = require('path');
const { template } = require('./template');

const app = express();

app.use('/client', express.static(path.resolve(__dirname, '..', 'client')));

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
  console.log(`Rendering page ${req.params.page}`);
  const props = pageProps[req.params.page]?.getProps() || {};

  res.send(template(req.params.page, props));
});

app.listen(3000, () => {
  console.log('App started on port 3000');
});
