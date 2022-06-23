import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {LikeStatus} from "./like-model";

@Entity()
export class LikeEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    likedUserId: number

    @Column({type: 'enum', enum: LikeStatus, default: LikeStatus.SUBMITTED})
    status: LikeStatus

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
}
