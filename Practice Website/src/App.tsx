// import "./App.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./resource/routes/broswerRoutes"
import { AuthContextProvider } from "./resource/context/AuthContext"

//  Use MUI to make the website - show MUI proficiency
// 3 things to include in this project
// 1. a basic counter WITH a twist... of course
//    counter does something with css (only of that page) depending on the number or mods (and maybe special case)
//    separate counter that increments autonomously to show this counter is not simple
// 2. conway's game of life - show basic logic game making. MAKE
//    make this using BASE HTML ELEMENTS, legit make your own
// 3. embed youtube video - show i can use other people's api and stuff

function App() {
	return (
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	)
}

export default App
