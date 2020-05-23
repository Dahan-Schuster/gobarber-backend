import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

/**
 * Format of the token payload returned by the verify function
 *
 * @version 1.0.0
 */
interface TokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

/**
 * Middleware for ensuring that the user is authenticated by a JWT
 *
 * @param req
 * @param res
 * @param next
 *
 * @version 1.0.0
 */
export default function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	const authorizationHeader = req.header('Authorization');

	if (!authorizationHeader) {
		res.status(400).json({ error: 'JWT header is missing' });
		return;
	}

	const [, token] = authorizationHeader.split(' ');

	try {
		const decodedToken = verify(token, authConfig.jwt.secret);

		const { sub } = decodedToken as TokenPayload;
		req.user = {
			id: sub,
		};
		next();
	} catch {
		res.status(400).json({ error: 'Invalid token' });
	}
}
