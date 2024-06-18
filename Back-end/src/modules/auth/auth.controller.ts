import { Request, Response } from 'express';
import { comparePasswords, getJwt, hashPassword } from '../../utils/auth';
import { getUserByColumn, insertUser, updateUserToken } from './auth.service';
import CustomError from '../../utils/errors/customError';
import ValidationError from '../../utils/errors/validationError';

class AuthController {

    public async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await getUserByColumn('email', email);
        const isMatch = comparePasswords(password, user.password)

        if (!user || !isMatch) {
            throw new ValidationError('Invalid email or password')
        }

        const accessToken = getJwt({ id: user.id, email: user.email });
        await updateUserToken(email, accessToken)
        res.status(200).json({ code: 1, data: { accessToken } });
    }

    public async register(req: Request, res: Response) {
        const { nickname, password, email } = req.body;
        const hashedPassword = hashPassword(password);
        const user = await getUserByColumn('email', email);

        if (user) {
            throw new CustomError(409, 'User already registered with this email')
        }

        await insertUser(email, nickname, hashedPassword)
        res.status(201).json({ code: 1 });
    }

    public async logout(req: Request, res: Response) {
        const { email } = (req as any).user;
        await updateUserToken(email, null)
        res.send({ code: 1, data: null });
    }
}

export default new AuthController()