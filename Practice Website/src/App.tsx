// import "./App.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./resource/routes/broswerRoutes"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { AuthContextProvider } from "./resource/context/AuthContext"

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ApolloProvider>
  )
}

export default App
