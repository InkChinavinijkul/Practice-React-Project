/* eslint-disable @typescript-eslint/no-var-requires */
process.env.BUILD_STATUS = "DEV"

import { ApolloServer, gql } from "apollo-server-express"
import typeDefs from "./typeDefs"
import resolvers from "./resolvers"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import cors from "cors"
import { graphqlUploadExpress } from "graphql-upload"
import { createServer } from "http"
import { GraphQLError } from "graphql"
// import { getUser } from "./General/utilities"

export interface IContext {
	user: {
		username: string
		permission: string
		employee: string
		department: string
		exp: number
		iat: number
	}
}

const express = require("express")
async function main() {
	const app = express()
	const httpServer = createServer(app)

	const server = new ApolloServer({
		typeDefs,
		resolvers,
	})

	await server.start()
	app.use(graphqlUploadExpress())
	app.use(cors())
	server.applyMiddleware({ app })
	await new Promise((r) => app.listen({ port: 4000 }, r))

	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
	console.log(`Running on ${process.env.NODE_ENV || "production"} Database`)
}
main()
