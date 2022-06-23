export interface ILike {
    id: number
    userId: number
    likedUserId: number
    status: LikeStatus
    created_at: Date;
    updated_at: Date;
}

export type IPartialLike = Omit<ILike, "id" | "updated_at">
export type IUpdatedLike = Pick<ILike, "id" | "status">

export enum LikeStatus {
    SUBMITTED,
    APPROVED,
    REJECTED
}
