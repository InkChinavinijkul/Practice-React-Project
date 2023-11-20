import { Box, Toolbar } from "@mui/material"
import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

const MainLayout = (): JSX.Element => {
	return (
		<Box sx={{ display: "flex" }} id="page-container">
			<NavBar />
			<Box component="main" sx={{ flexGrow: 1 }} id="page-body">
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	)
}

export default MainLayout
