import AddIcon from "@mui/icons-material/Add"
import GridViewIcon from "@mui/icons-material/GridView"
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo"
import { AccountRole } from "../context/AuthContext"

export interface NavListItem {
	name: string
	roles: AccountRole[]
	icon: JSX.Element
}

export const navMainList: NavListItem[] = [
	{
		name: "Fun Counter",
		roles: ["user", "admin"],
		icon: <AddIcon />,
	},
	{
		name: "Game of Life",
		roles: ["user", "admin"],
		icon: <GridViewIcon />,
	},
	{
		name: "Video Player",
		roles: ["user", "admin"],
		icon: <OndemandVideoIcon />,
	},
]
