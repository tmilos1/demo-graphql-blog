import { getRepository, In } from "typeorm";
import * as DataLoader from "dataloader"

import * as PostService from "../service/Post"
import * as CommentService from "../service/Comment"
import * as CategoryService from "../service/Category"

import { Post } from "../entity/Post";
import { Category } from "../entity/Category";
import { Author } from "../entity/Author";
import { Comment } from "../entity/Comment";

const categoryLoader = new DataLoader((keys: number[]) => batchGetCategoryByPostId(keys))
const authorLoader = new DataLoader((keys: number[]) => batchGetAuthorByPostId(keys))
const commentsLoader = new DataLoader((keys: number[]) => batchGetCommentsByPostId(keys))

const batchGetCategoryByPostId = async (ids: number[]) => {
  return await getRepository(Category).find({ where: { id: In(ids) } })
}

const batchGetAuthorByPostId = async (ids: number[]) => {
  return await getRepository(Author).find({ where: { id: In(ids) } })
}

const batchGetCommentsByPostId = async (ids: number[]) => {
  const comments = await getRepository(Comment)
    .createQueryBuilder("comment")
    .leftJoinAndSelect("comment.post", "post")
    .where("post.id IN (:...ids)", { ids })
    .getMany()

  return ids.map(id => comments.filter(comment => comment.postId === id));
}

const resolvers = {
  Query: {
    async posts(parent, args, context) {
      return await getRepository(Post).find()
    },
  },
  Mutation: {
    async createPost(parent, { post }, context) {
      return await PostService.createPost(post)
    },
    async createComment(parent, { comment }, context) {
      return await CommentService.createComment(comment)
    },
    async createCategory(parent, { category }, context) {
      return await CategoryService.createCategory(category)
    }
  },
  MutationResponse: {
    __resolveType(mutationResponse, context, info) {
      return null;
    }
  },
  Post: {
    category(post: Post, args, context) {
      return categoryLoader.load(post.categoryId)
    },
    author(post: Post, args, context) {
      return authorLoader.load(post.authorId)
    },
    async comments(post: Post) {
      return commentsLoader.load(post.id)
    }
  }
}

export default resolvers
