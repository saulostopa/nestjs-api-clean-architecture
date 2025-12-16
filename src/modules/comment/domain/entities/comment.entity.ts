// comments/domain/entities/comment.entity.ts
export class Comment {
  constructor(
    public readonly id: string,
    public readonly postId: string,
    public readonly authorId: string,
    public readonly content: string,
  ) {}
}
