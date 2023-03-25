import jwt from 'jsonwebtoken';
import { CONFIG } from '../config';
import { err } from '../utils/error';
import { RequestUser, User } from '../interfaces/index';

const JWT_SECRET = CONFIG.jwt.secret;

export const sign = (data: any) => {
    return jwt.sign(data, JWT_SECRET);
}

export const check = () => {
    return { 
        own: (req: RequestUser<User>, owner: any) => {
            const decoded = decodeHeader(req);
            console.log(decoded);
    
            if (decoded.id !== owner) {
                throw err('No puedes hacer esto', 401);
            }
        },
        logged: (req: RequestUser<User>, owner: any) => {
            const decoded = decodeHeader(req);
        }
    }
}

const verifyToken = (token: string) => {
    // VALIDAR SI EL TOKEN HA EXPIRADO
    return jwt.verify(token, JWT_SECRET) as User;
}


const getToken = (auth: string) => {
    if (!auth) throw err('No viene token', 401);
    

    if (auth.indexOf('Bearer ') === -1) throw err('Formato invalido', 401);

    let token = auth.replace('Bearer ', '');
    return token;
}

const decodeHeader = (req: RequestUser<User>) => {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoced = verifyToken(token);
    req.user = decoced;
    return decoced;
}