import { NextFunction, Request, Response } from 'express';

export const succes = (req: Request, res: Response, message = '', status = 200) => {
    res.status(status).send({
        error: false,
        status,
        body: message
    });
};

export const error = (req: Request, res: Response, message = 'Internal server error', status = 500) => {
    res.status(status).send({
        error: true,
        status,
        body: message
    });
}