import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {LikesController} from './controllers/likes.controller';
import {LikesService} from './services/likes.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import {LikeEntity} from './models/like-entity';
import {AuthMiddleware} from "../auth/middleware/auth.middleware";


@Module({
    imports: [
        TypeOrmModule.forFeature([LikeEntity]),
        JwtModule
    ],
    providers: [LikesService],
    controllers: [LikesController],
    exports: [LikesService],
})
export class LikesModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('*');
    }
}
