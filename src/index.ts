import express, { Request, Response } from 'express';

const app = express();
const host: string = '0.0.0.0';
const port: number = 3000;

// Cria uma rota para a URL raiz ("/") que responde com "Hello, World!".
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello, World! from Express');
});

const server = app.listen(port, host, () => {
  console.info(`🚀 Communication API server started`);
  console.info(`📍 Server running at http://${host}:${port}`);
  console.info(`🌍 Environment: ${process.env['NODE_ENV'] || 'development'}`);
  console.info(`⏰ Started at: ${new Date().toISOString()}`);
});

const gracefulShutdown = async (signal: string): Promise<void> => {
  console.info(`🛑 Received ${signal}. Starting graceful shutdown...`);

  server.close(async (err) => {
    if (err) {
      console.error('❌ Error during server shutdown:', err);
      process.exit(1);
    }

    console.info('✅ Server closed successfully');
    process.exit(0);
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.error('❌ Forced shutdown after timeout');
    process.exit(1);
  }, 30000);
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});