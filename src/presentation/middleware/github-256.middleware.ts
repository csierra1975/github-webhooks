import { NextFunction, Request, Response } from 'express'
import * as crypto from "crypto";
import { envs } from '../../config';

const verify_signature = (req: Request) => {

    try {
        const signature = crypto
        .createHmac("sha256", envs.SECRET_TOKEN)
        .update(JSON.stringify(req.body))
        .digest("hex");
  
      const sHubSignature = req.header("x-hub-signature-256") ?? ''
      let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
      let untrusted =  Buffer.from(sHubSignature, 'ascii');
      return crypto.timingSafeEqual(trusted, untrusted);
    } catch (error) {
        return false
    }
  };

export class Github256Middleware {

    static verifySignature = (req: Request, res: Response, next: NextFunction) => {

        if (!verify_signature(req)) {
            res.status(401).send("Unauthorized");
            return;
          }
        
          next()
    }
}