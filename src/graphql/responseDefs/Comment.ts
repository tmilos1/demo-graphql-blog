export const responseDef = `
  type CreateCommentMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    comment: Comment
  }
`
