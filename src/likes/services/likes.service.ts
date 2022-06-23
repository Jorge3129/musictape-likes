import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, UpdateResult} from "typeorm";
import {LikeEntity} from "../models/like-entity";
import {from, Observable} from "rxjs";
import {ILike, IPartialLike} from "../models/like-model";

@Injectable()
export class LikesService {
    constructor(
        @InjectRepository(LikeEntity)
        private readonly likeRepo: Repository<LikeEntity>,
    ) {
    }

    public create(like: IPartialLike): Observable<ILike> {
        return from(this.likeRepo.save(like))
    }

    public update(id: number, like: IPartialLike): Observable<UpdateResult> {
        return from(this.likeRepo.update(id, like))
    }

    public findAll(userId: number): Observable<ILike[]> {
        return from(this.likeRepo.findBy([{userId: userId}, {likedUserId: userId}]))
    }
}
