import app from "./app";

import "./services/oraConn";

app.listen(3333).on("listening", () => {
  console.log(`Web server listening on localhost:${3333}`);
});
