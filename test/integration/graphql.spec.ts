process.env.NODE_ENV = "test"
import { createTestClient } from "apollo-server-testing"
import { createConnection } from "typeorm"

import typeDefs from "../../src/graphql/schema"
import resolvers from "../../src/graphql/resolvers"
import { ApolloServer } from "apollo-server-express"
import assert = require("assert")

const GET_POSTS = `
{
	posts {
		title
  }
}
`

describe("posts testing", () => {
    it("fetches a list of posts", async () => {
        await createConnection()

        const server = new ApolloServer({
            typeDefs,
            resolvers
        })

        // use the test server to create a query function
        const { query } = createTestClient(server)

        const res = await query({ query: GET_POSTS})

        assert(Array.isArray(res.data.posts))
    })
})
