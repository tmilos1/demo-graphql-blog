import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";

import { Post } from "./entity/Post";
import { Comment } from "./entity/Comment";
import { Category } from "./entity/Category";
import { Author } from "./entity/Author";

createConnection().then(async connection => {

    const author = new Author()
    author.fullName = "John Smith"
    author.email = "john@some-email.com"
    await connection.manager.save(author)

    const categorySport = new Category()
    categorySport.name = "Sport"
    await connection.manager.save(categorySport)

    const categoryHistory = new Category()
    categoryHistory.name = "History"
    await connection.manager.save(categoryHistory)
    // const author = await getRepository(Author).findOne(1)
    // const categorySport = await getRepository(Category).findOne(1)
    // const categoryHistory = await getRepository(Category).findOne(2)

    const post1 = new Post()
    post1.author = author
    post1.category = categorySport
    post1.published = new Date()
    post1.title = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    post1.body = "Etiam a interdum lectus, sed laoreet dolor. Aliquam efficitur lacus et sapien rutrum finibus. Cras nulla nibh, hendrerit vel commodo non, tincidunt sed odio. Proin eu nisi laoreet, malesuada velit nec, ornare ipsum. Sed egestas purus nec metus tincidunt sodales. Phasellus at tincidunt lectus, eu pellentesque leo. Morbi vitae condimentum lacus, vel aliquam metus. Aenean aliquam semper ipsum, vel cursus neque aliquet vel. Nunc eleifend luctus metus vitae volutpat. Nunc eget magna porttitor nulla placerat ultricies non ut est."
    post1.mainImage = "http://lorempixel.com/400/200/sports/"
    await connection.manager.save(post1)

    const post2 = new Post()
    post2.author = author
    post2.category = categoryHistory
    post2.published = new Date()
    post2.title = "Aenean mollis varius tristique."
    post2.body = "Donec varius iaculis orci, a aliquet elit pretium in. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc porta sit amet eros a scelerisque. Nam iaculis, quam eu feugiat egestas, felis sem eleifend risus, vitae lobortis purus urna ut nulla. Cras in ligula pellentesque, viverra dolor nec, maximus tellus. Sed lacinia interdum ex, in venenatis est ullamcorper sit amet."
    post2.mainImage = "http://lorempixel.com/400/200/people/"
    await connection.manager.save(post2)

    // const post1 = await getRepository(Post).findOne(1)

    const comment = new Comment()
    comment.name = "Milos"
    comment.email = "abcd@somemail.com"
    comment.body = "Cras in ligula pellentesque, viverra dolor nec, maximus tellus. Sed lacinia interdum ex, in venenatis est ullamcorper sit amet."
    comment.post = post1
    await connection.manager.save(comment)

}).catch(error => console.log(error))
