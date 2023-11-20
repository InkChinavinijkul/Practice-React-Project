import { useLazyQuery } from "@apollo/client"
import {
	Box,
	Button,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
} from "@mui/material"
import { ChangeEvent, useState } from "react"
import { GET_LOGIN_USER } from "../query/query"
import swal from "sweetalert"
import { useNavigate } from "react-router-dom"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy"

const errorMessage = (inputType: string, inputValue: string) => {
	if (!inputValue) return `Please enter a valid ${inputType}.`
	return `${inputType} incorrect.`
}

const logoImage = "/assets/img/logo_dark.png"

const Login = (): JSX.Element => {
	const [userName, setUserName] = useState<string>("")
	const [userNameError, setUserNameError] = useState<boolean>(false)
	const [password, setPassword] = useState<string>("")
	const [passwordError, setPasswordError] = useState<boolean>(false)
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const navigate = useNavigate()
	const [getLogin] = useLazyQuery(GET_LOGIN_USER)

	const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!userName) {
			setUserNameError(true)
			alert("Please enter a username")
		}
		if (!password) {
			setPasswordError(true)
			alert("Please enter a password")
		}
		try {
			const { data } = await getLogin({
				variables: { username: userName, password },
			})

			if (data?.loginUser?.accessToken) {
				localStorage.setItem("token", data.loginUser.accessToken)
				const lastPath = localStorage.getItem("lastPath") || "/"
				swal("Login Success!", "Success!", "success")
				navigate(lastPath, { replace: true })
				window.location.reload()
			} else {
				if (data?.loginUser?.errorMessage === "Invalid Password!")
					setPasswordError(true)
				if (data?.loginUser?.errorMessage === "Invalid User!")
					setUserNameError(true)
				return swal("Error!", `Incorrect Username or Password`, "error")
			}
		} catch (error) {
			return swal("Error!", `${(error as Error).message}}`, "error")
		}
	}

	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: "100vh" }}
			className="login-page">
			<Grid
				item
				xs={12}
				style={{
					padding: "2em",
				}}>
				<Box component="form" onSubmit={(e) => handleSignIn(e)}>
					<Grid
						item
						container
						xs={12}
						spacing={2}
						direction="column"
						alignItems={"center"}
						justifyContent="center"
						style={{ textAlign: "center" }}>
						<Grid container item xs={12} justifyContent={"center"}>
							<TheaterComedyIcon
								sx={{ width: "150px", height: "150px", color: "orange" }}
							/>
						</Grid>
						<Grid
							container
							item
							justifyContent="center"
							width={"600px"}
							// maxWidth={"600px"}
							style={{ alignItems: "center" }}
							spacing={2}
							alignItems={"center"}>
							<Grid item xs={12} container justifyContent={"flex-start"}>
								<span
									style={{
										color: "black",
										fontSize: "40px",
										fontWeight: "bold",
									}}>
									Login
								</span>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									type="string"
									key="login-username-input"
									style={{ textAlign: "center" }}
									label="Username"
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										setUserName(event.target.value)
									}
									error={userNameError}
									helperText={
										userNameError ? errorMessage("Username", userName) : ""
									}
								/>
							</Grid>
							<Grid item xs={12} className="password-input">
								<TextField
									fullWidth
									key="login-password-input"
									type={showPassword ? "string" : "password"}
									style={{ textAlign: "center" }}
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										setPassword(event.target.value)
									}
									error={passwordError}
									helperText={
										passwordError ? errorMessage("Password", password) : ""
									}
									label="Password"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={() => setShowPassword(!showPassword)}
													onMouseDown={(
														event: React.MouseEvent<HTMLButtonElement>
													) => event.preventDefault()}
													edge="end">
													{showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12} style={{ textAlign: "center" }}>
								<Button fullWidth type="submit" variant="contained">
									Login
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</Grid>
	)
}

export default Login
