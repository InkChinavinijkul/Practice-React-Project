import { createContext, useCallback, useMemo, useState } from "react"

export type AccountRole = "admin" | "user"

interface IAuthContextUser {
	username: string
	role: AccountRole
}

export interface AuthContextInterface {
	user?: IAuthContextUser
	checkRole: (roles: string[]) => boolean
	setLocalStorage: (user: IAuthContextUser) => void
	token?: string
}

const AuthContext = createContext<AuthContextInterface>({
	checkRole: () => false,
	setLocalStorage: () => {},
})

const getToken = (): string => {
	const token: string = localStorage.getItem("token") || ""

	return token
}

export const AuthContextProvider = ({
	children,
}: {
	children: JSX.Element
}): JSX.Element => {
	const [user, setUser] = useState<IAuthContextUser>()

	const checkRole = useCallback(
		(roles: string[]) => {
			if (!user) return false
			return roles.includes(user.role)
		},
		[user]
	)

	const token = getToken()
	const setLocalStorage = useCallback(() => {
		//  technically would want jwt-decode this
		//  but this is practice
		localStorage.setItem("token", JSON.stringify(user))
	}, [user])

	useMemo(() => {
		if (token) {
			setUser(JSON.parse(token))
		}
	}, [token])

	const context = useMemo(() => {
		return { user, checkRole, setLocalStorage, token }
	}, [user, checkRole, setLocalStorage, token])

	return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export default AuthContext
