import { Request, Response, NextFunction } from 'express'

export default function (err: any, _: Request, res: Response, __: NextFunction) {
    if (typeof err === 'string') return res.status(400).json({ message: err, type: 'error' })
    if (err.name === 'ValidationError')
        return res.status(400).json({ message: err.message, type: 'error' })
    if (err.name === 'UnauthorizedError')
        return res.status(401).json({ message: 'Invalid Token', type: 'error' })
    return res.status(500).json({ message: err.message, type: 'error' })
}
