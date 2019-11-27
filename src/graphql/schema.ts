import { typeDef as Post } from "./typeDefs/Post"
import { typeDef as Category } from "./typeDefs/Category"
import { typeDef as Comment } from "./typeDefs/Comment"
import { typeDef as Author } from "./typeDefs/Author"

import { inputDef as PostInputs } from "./inputDefs/Post"
import { inputDef as CategoryInputs } from "./inputDefs/Category"
import { inputDef as CommentInputs } from "./inputDefs/Comment"

import { responseDef as PostResponses } from "./responseDefs/Post"
import { responseDef as CategoryResponses } from "./responseDefs/Category"
import { responseDef as CommentResponses } from "./responseDefs/Comment"

const defs = [
  Post, Category, Comment, Author,
  PostInputs, CategoryInputs, CommentInputs,
  PostResponses, CategoryResponses, CommentResponses
].join("\n")

const typeDefs = defs + `
  type Query {
    posts: [Post]!
    authors: [Author]!
    categories: [Category]!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type Mutation {
    createPost(post: CreatePostInput): CreatePostMutationResponse
    createComment(comment: CreateCommentInput): CreateCommentMutationResponse
    createCategory(category: CreateCategoryInput): CreateCategoryMutationResponse
    mainImageUpload(file: Upload): File
  }
`

export default typeDefs
