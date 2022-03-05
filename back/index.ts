import express from "express";
import cors from 'cors';
import { routes } from './routes';
import * as http from 'http';
import { authenticateToken } from "./app";

const app: express.Application = express();
const PORT = 3000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(authenticateToken);

for (let route in routes) app.use(route, routes[route]);

app.use(handleError)

const serverHttp: http.Server = http.createServer(app);
serverHttp.listen(PORT, () => {
  console.log('HTTP Server listening at port : ' + PORT);
});

function handleError(routeError, req: express.Request, res: express.Response, next) {
  console.error(routeError.error);
  res.status(routeError.status);
  res.json(routeError.message);
}