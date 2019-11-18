import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, RelationId } from "typeorm"
import { Comment } from "./Comment"
import { Category } from "./Category"
import { Author } from "./Author"

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    published: Date

    @ManyToOne(type => Category)
    category: Category

    @RelationId((post: Post) => post.category)
    categoryId: number

    @Column("text")
    body: string

    @Column({ default: "" })
    mainImage: string

    @ManyToOne(type => Author)
    author: Author

    @RelationId((post: Post) => post.author)
    authorId: number

    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[]
}
