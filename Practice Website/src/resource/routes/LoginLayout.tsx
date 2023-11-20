import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

const LoginLayout = (): JSX.Element => {
  return (
    <Box sx={{ display: "flex" }} id="page-container">
      <Box component="main" sx={{ flexGrow: 1 }} id="login-body">
        <Outlet />
      </Box>
    </Box>
  )
}

export default LoginLayout
