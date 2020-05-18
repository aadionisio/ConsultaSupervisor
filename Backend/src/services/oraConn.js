import database from "./database";

import dbConfig from "../config/database";

const defaultThreadPoolSize = 4;

// Increase thread pool size by poolMax
process.env.UV_THREADPOOL_SIZE =
  dbConfig.EcPool.poolMax + defaultThreadPoolSize;

async function startup() {
  console.log("Starting application");

  try {
    console.log("Initializing database module");

    await database.initialize();
    console.log("Innicialização finalizada");
  } catch (err) {
    console.error(err);

    process.exit(1); // Non-zero failure code
  }
}

startup();

async function shutdown(e) {
  let err = e;

  try {
    console.log("Closing database module");

    await database.close();
  } catch (e) {
    console.error(e);

    err = err || e;
  }

  console.log("Exiting process");

  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
}

process.on("SIGTERM", () => {
  console.log("Received SIGTERM");

  shutdown();
});

process.on("SIGINT", () => {
  console.log("Received SIGINT");

  shutdown();
});

process.on("uncaughtException", err => {
  console.log("Uncaught exception");
  console.error(err);

  shutdown(err);
});
