import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"

interface IRequireAuthProps {
  renderedElement: JSX.Element
  roles: string[]
  redirectTo?: string
}

const RequireAuth = (props: IRequireAuthProps): JSX.Element => {
  const { roles, redirectTo = "/", renderedElement } = props
  const { checkRole, token } = useContext(AuthContext)

  if (!token) return <Navigate to={"login"} />

  return checkRole(roles) ? renderedElement : <Navigate to={redirectTo} />
}

export default RequireAuth
