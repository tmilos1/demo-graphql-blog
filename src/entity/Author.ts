import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullName: string

    @Column()
    email: string
}
