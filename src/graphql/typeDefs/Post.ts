export const typeDef = `
  type Post {
    id: ID!
    title: String!
    published: String!
    category: Category!
    body: String!
    mainImage: String
    author: Author!
    comments: [Comment]
  }
`
