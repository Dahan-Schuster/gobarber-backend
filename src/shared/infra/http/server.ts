import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';
import cors from 'cors';

import AppError from '@shared/errors/AppError';

import uploadConfig from '@config/upload';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

// celebrate errors
app.use(errors());

// Global Exception Handler
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});
	}

	console.error(err);
	return res.status(500).json({
		status: 'error',
		message: 'Internal server error',
	});
});

app.listen(3333, () => {
	console.log('Server started on port 3333');
});
