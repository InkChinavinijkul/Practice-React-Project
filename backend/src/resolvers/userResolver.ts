interface loginInput {
	username: string
	password: "admin" | "user"
}

const userResolver = {
	Query: {
		async getUser(root: any, user: loginInput) {
			const { username, password } = user
			try {
				if (username === "admin" && password === "admin")
					return { username: "admin", role: "admin" }
				if (username === "user" && password === "user")
					return { username: "user", role: "user" }
				return { username: "", role: "" }
			} catch (error) {
				throw new Error((error as Error).message.toString())
			}
		},
		// hello: () => "Hello, world!",
	},
}

export default userResolver
