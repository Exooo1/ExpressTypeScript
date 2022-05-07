import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.type('html').send('<h1>TypeScript Server</h1>');
});
app.use((req: Request, res: Response, next: NextFunction) => {
	res.type('json').status(404).json({ error: 'Not Found' });
});
app.use((req: Request, res: Response, next: NextFunction) => {
	res.type('json').status(500).json({ error: 'Server Error' });
});

app.listen(port, () => {
	console.log('Server Started');
});
