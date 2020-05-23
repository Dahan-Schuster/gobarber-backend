import { Request } from 'express';
import multer from 'multer';
import * as path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
	directory: tmpFolder,
	storage: multer.diskStorage({
		destination: tmpFolder,
		filename(
			req: Request,
			file: Express.Multer.File,
			callback: (error: Error | null, filename: string) => void,
		) {
			const hash = crypto.randomBytes(10).toString('hex');
			const filename = `${hash}-${file.originalname}`;

			return callback(null, filename);
		},
	}),
};
