import {HttpException, HttpStatus, Injectable, NestMiddleware} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {PUBLIC_KEY} from '../../shared/constants/public-key';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private jwtService: JwtService) {
    }

    use(req: any, res: any, next: () => void) {
        try {
            const token = req.headers?.authorization?.split(' ')[1];
            if (!token) throw new HttpException('No token present', HttpStatus.FORBIDDEN)
            const decodedToken: any = this.jwtService.verify(token, {publicKey: PUBLIC_KEY});
            const userId = decodedToken?.id;
            if (!decodedToken || typeof userId !== "number")
                throw new HttpException('Invalid token', HttpStatus.FORBIDDEN)
            res.locals.userId = userId;
            next();
        } catch (e: any) {
            throw new HttpException(e.message, HttpStatus.FORBIDDEN)
        }
    }
}
