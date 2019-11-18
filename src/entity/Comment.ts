import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId } from "typeorm"
import { Post } from "./Post"

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column("text")
    body: string

    @ManyToOne(type => Post, post => post.comments)
    post: Post

    @RelationId((comment: Comment) => comment.post)
    postId: number
}
