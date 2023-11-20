import { useLazyQuery } from "@apollo/client"
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField
} from "@mui/material"
import { ChangeEvent, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy"
import AuthContext, {
  IAuthContextUser
} from "@src/resource/context/AuthContext"
import { GET_USER } from "@src/graphql/query/query"

const errorMessage = (inputType: string, inputValue: string) => {
  if (!inputValue) return `Please enter a valid ${inputType}.`
  return `${inputType} incorrect.`
}

const Login = (): JSX.Element => {
  const [username, setUsername] = useState<string>("")
  const [usernameError, setUsernameError] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { setLocalStorage } = useContext(AuthContext)
  const navigate = useNavigate()
  const [getUser] = useLazyQuery(GET_USER)

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!username) {
      setUsernameError(true)
      alert("Please enter a username")
      return
    }
    if (!password) {
      setPasswordError(true)
      alert("Please enter a password")
      return
    }

    try {
      // supposed to have codegen to help out with types but "practice" (ie. lazy)
      const { data } = await getUser({ variables: { username, password } })
      if (data?.getUser?.role) {
        const queriedUsername = data.getUser.username
        const queriedRole = data.getUser.role
        const storeUser: IAuthContextUser = {
          username: queriedUsername,
          role: queriedRole
        }
        setLocalStorage(storeUser)
        // you'd notice that you get to the main page
        // then everything reloads again
        // yea idk how to fix that LOL
        navigate("/", { replace: true })
        window.location.reload()
      } else {
        setUsernameError(true)
        setPasswordError(true)
        alert("Incorrect Username or Password")
      }
    } catch (error) {
      console.log(error)
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
      className="login-page"
    >
      <Grid
        item
        xs={12}
        style={{
          padding: "2em"
        }}
      >
        <Box component="form" onSubmit={(e) => handleSignIn(e)}>
          <Grid
            item
            container
            xs={12}
            spacing={2}
            direction="column"
            alignItems={"center"}
            justifyContent="center"
            style={{ textAlign: "center" }}
          >
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
              alignItems={"center"}
            >
              <Grid item xs={12} container justifyContent={"flex-start"}>
                <span
                  style={{
                    color: "black",
                    fontSize: "40px",
                    fontWeight: "bold",
                    paddingLeft: "10px"
                  }}
                >
                  Coolio Webio?
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
                    setUsername(event.target.value)
                  }
                  error={usernameError}
                  helperText={
                    usernameError ? errorMessage("username", username) : ""
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
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
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
