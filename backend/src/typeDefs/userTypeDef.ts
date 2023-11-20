import { gql } from "apollo-server-express"

const userTypeDef = gql`
	type TUserInfo {
		username: String
		role: String
	}
	type Query {
		getUser(username: String, password: String): TUserInfo
	}
`

export default userTypeDef
