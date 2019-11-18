export const responseDef = `
  type CreatePostMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    post: Post
  }
`
