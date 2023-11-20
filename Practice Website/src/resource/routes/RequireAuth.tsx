import AuthContext from "@src/context/AuthContext"
import { useContext } from "react"
import { Navigate } from "react-router-dom"

interface IRequireAuthProps {
	renderedElement: JSX.Element
	roles: string[]
	redirectTo?: string
}

const RequireAuth = (props: IRequireAuthProps): JSX.Element => {
	const { roles, redirectTo = "/dashboard", renderedElement } = props
	const authContext = useContext(AuthContext)
	const checkRole = authContext.checkRole
	const token = authContext.token
	localStorage.setItem("lastPath", window.location.pathname)
	if (!token) return <Navigate to={"login"} />
	return checkRole(roles) ? renderedElement : <Navigate to={redirectTo} />
}

export default RequireAuth
