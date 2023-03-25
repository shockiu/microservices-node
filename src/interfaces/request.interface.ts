import { Request } from 'express';

export interface RequestUser<T> extends Request {
    user: T;
}