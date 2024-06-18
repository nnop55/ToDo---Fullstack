import { NextFunction, Request, Response } from 'express';
import { JWTSecretKey } from '../shared/config';
import { verifyJwt } from '../utils/auth';
import { getUserByColumn, updateUserToken } from '../modules/auth/auth.service';
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
        (req as any).user = instance;

        if (!instance || !decoded) {
            throw new UnauthorizedError()
        }

        return next()
    } catch (err) {
        await updateUserToken('access_token', token, null)
        next(new UnauthorizedError('Invalid Token'))
    }
};