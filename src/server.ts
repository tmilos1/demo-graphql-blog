import * as express from "express"
import * as bodyParser from "body-parser"
import * as helmet from "helmet"
import * as cors from "cors"
import * as compress from "compression"
import * as dotenv from "dotenv"
import { ApolloServer } from "apollo-server-express"
import { createConnection } from "typeorm"

import typeDefs from "./graphql/schema"
import resolvers from "./graphql/resolvers"

dotenv.config()

// create typeorm connection
createConnection().then(connection => {
  // create and setup express app
  const app = express()

  app.use(bodyParser.json())

  if (process.env.NODE_ENV === "production") {
    app.use(helmet())
    app.use(helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline"],
        styleSrc: ["'self'", "'unsafe-inline"],
        imgSrc: ["'self'", "data:", "*.amazonaws.com"]
      }
    }))
    app.use(helmet.referrerPolicy({ policy: "same-origin" }))
    app.use(compress())
    app.use(cors())
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    engine: {
      // The Graph Manager API key
      apiKey: process.env.ENGINE_API_KEY,
      // A tag for this specific environment (e.g. `development` or `production`).
      // For more information on schema tags/variants, see
      // https://www.apollographql.com/docs/platform/schema-registry/#associating-metrics-with-a-variant
      schemaTag: "development",
      debugPrintReports: false
    }
  })

  server.applyMiddleware({ app })

  // start express server
  app.listen(3000)
})
