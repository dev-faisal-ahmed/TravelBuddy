import mongoose from 'mongoose';
import { Server } from 'http';
import { app } from './app';
import { MONGO_URI, PORT } from './config';

let server: Server;

const main = async () => {
  try {
    await mongoose.connect(MONGO_URI!);
    server = app.listen(PORT, () => {
      console.log(`App is listening to the port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();

// handling the uncaught exception
process.on('uncaughtException', () => {
  console.log(`Uncaught exception has occurred, shutting down the server`);
  process.exit(1);
});

// handling the unhandled rejections
process.on('unhandledRejection', () => {
  console.log(
    `Sorry we are facing unhandled rejection, shutting down the server`
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
