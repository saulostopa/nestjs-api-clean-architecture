export class Post {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public published: boolean,
    public viewCount: number,
    public readonly authorId: string, // User ID
  ) {}
}
