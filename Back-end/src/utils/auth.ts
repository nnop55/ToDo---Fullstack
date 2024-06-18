import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWTSecretKey } from '../shared/config';

export const comparePasswords = (
    password: string,
    hashedPassword: string
) => {
    return bcrypt.compareSync(password, hashedPassword)
}

export const hashPassword = (
    password: string
) => {
    return bcrypt.hashSync(password, 10)
}

export const getJwt = (
    payload: any,
    time: string = '1m'
) => {
    return jwt.sign(payload, JWTSecretKey!, { expiresIn: time });
}

export const verifyJwt = (
    token: string,
    secretKey: string
) => {
    return jwt.verify(token, secretKey);
}