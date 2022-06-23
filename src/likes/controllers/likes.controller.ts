import {Body, Controller, Get, Param, Patch, Post, Res} from '@nestjs/common';
import {ILike, IPartialLike} from '../models/like-model';
import {LikesService} from "../services/likes.service";
import {catchError, map, Observable, of} from "rxjs";
import {UpdateResult} from "typeorm";

@Controller('likes')
export class LikesController {

    constructor(
        private likesService: LikesService
    ) {
    }

    @Post()
    create(@Body() like: IPartialLike): Observable<ILike | { error: any }> {
        return this.likesService.create(like).pipe(
            catchError(err => of({error: err.message}))
        );
    }

    @Get()
    findAll(@Res({ passthrough: true }) res): Observable<ILike[] | { error: any }> {
        return this.likesService.findAll(res.locals.userId).pipe(
            catchError(err => of({error: err.message}))
        );
    }

    @Patch(':id')
    update(@Param() params, @Body() like: IPartialLike): Observable<UpdateResult | { error: any }> {
        return this.likesService.update(params.id, like).pipe(
            catchError(err => of({error: err.message}))
        );
    }
}
