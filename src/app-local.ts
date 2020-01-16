import createApp from './app';

const port = Number(process.env.PORT) || 3000;

Promise
  .resolve(createApp())
  .then((app) => app
    .listen(port, (err: Error) => (err
      ? console.error(err)
      : console.log(`listening on ${port}`))))
  .catch(console.error);
