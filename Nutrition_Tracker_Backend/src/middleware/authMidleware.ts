import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt"

export interface AuthRequest extends Request{
    userId? : number;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) =>{
    const h = req.headers.authorization;
    if(!h || !h.startsWith("Bearer")){
        return res.status(401).json({ message:" Missing Token "})
    }
    const token = h.split(" ")[1];
    try{
        const decoded = verifyToken(token) as {id: number};
        (req as any).userId = decoded.id;;
        next()
    }catch{
        return res.status(403).json({message: "Invalid or expired token"})
    }
}