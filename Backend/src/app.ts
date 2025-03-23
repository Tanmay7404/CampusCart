import express, { Express, Request, Response } from 'express';
import http from 'http';
import path from 'path'
import { initializeSocket } from './socket';
import cors from 'cors'
import orderRoutes from './order/orderRoutes';

const app: Express = express();
const port = process.env.PORT || 8080;

// Middleware for parsing JSON
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}))

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

// Order routes
app.use('/api', orderRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = http.createServer(app)

initializeSocket(server)

// Start server
server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

