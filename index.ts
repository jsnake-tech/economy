import { initiateBot } from './src/connectors/bot';
import { IncomingMessage, ServerResponse } from "http";
import * as http from "http";

var server = http.createServer(
  async (request: IncomingMessage, response: ServerResponse) => {
    switch (request.url) {
      case "/run_bot": {
        initiateBot();
        response.setHeader("Content-Type", "text/json");
        try {
          response.end()
        } catch (err) {
          console.error(err);
        }
        break;
      }
    }
  }
);
server.listen(3000);
console.log("Server running at http://127.0.0.1:3000/");
