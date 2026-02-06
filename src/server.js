const app = require('./app');
const { connectToDatabase } = require('./db');

const port = process.env.PORT || 3000;

async function startServer() {
  await connectToDatabase();

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`REST API listening on port ${port}`);
  });
}

startServer().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
