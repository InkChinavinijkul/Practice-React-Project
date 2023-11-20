import { Box, Button } from "@mui/material"
import { useRouteError } from "react-router-dom"

const ErrorPage = (): JSX.Element => {
  const error = useRouteError()
  console.error(error)

  return (
    <Box component="div" id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button href="/">Return to Home</Button>
    </Box>
  )
}

export default ErrorPage
