export const responseDef = `
  type CreateCategoryMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    category: Category
  }
`
