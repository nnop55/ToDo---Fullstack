import { NextFunction, Request, Response } from 'express';
import { JWTRefreshTokenSecretKey, JWTSecretKey } from '../shared/config';
import { verifyJwt } from '../utils/auth';
import { getUserByColumn, updateUserColumn } from '../modules/auth/auth.service';
import UnauthorizedError from '../utils/errors/unauthorizedError';

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return next(new UnauthorizedError())
    }

    try {
        const decoded = verifyJwt(token, JWTSecretKey!);
        const instance = await getUserByColumn('id', (decoded as any).id);

        if (!instance || !decoded) {
            throw new UnauthorizedError()
        }

        (req as any).user = instance;

        return next()
    } catch (err) {
        await updateUserColumn('access_token', token, 'access_token', null)
        next(new UnauthorizedError('Invalid Token'))
    }
};

export const verifyRefreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return next(new UnauthorizedError())
    }

    try {
        const decoded = verifyJwt(token, JWTRefreshTokenSecretKey!);
        const instance = await getUserByColumn('id', (decoded as any).id);

        if (!instance || !decoded) {
            throw new UnauthorizedError()
        }

        (req as any).user = instance;

        return next()
    } catch (err) {
        await updateUserColumn('refresh_token', token, 'refresh_token', null)
        next(new UnauthorizedError('Invalid Token'))
    }
};