import {
	AppBar,
	Badge,
	BadgeProps,
	Box,
	Button,
	Divider,
	Drawer,
	Grid,
	IconButton,
	Link,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
	Slide,
	styled,
	Switch,
	Toolbar,
	Typography,
	useMediaQuery,
	useScrollTrigger,
} from "@mui/material"
import { AccountRole, NavListItem, navMainList } from "../routes/nav-routes"
import MenuItem from "@mui/material/MenuItem"
import Avatar from "@mui/material/Avatar"
import Tooltip from "@mui/material/Tooltip"
import MenuIcon from "@mui/icons-material/Menu"
import { useContext, useEffect, useMemo, useState } from "react"
import NavBarMobile from "./NavBarMobile"
import { NavigateFunction, useNavigate } from "react-router-dom"
import LogoutIcon from "@mui/icons-material/Logout"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { removeWhiteSpaces } from "../utilities"
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy"
import AuthContext from "../context/AuthContext"

interface INavMenuListProps {
	navList: NavListItem[]
	// currLang: LanguageKey,
	// role: AccountRole | undefined,
	navigate: NavigateFunction
	handleCloseMobileDrawer: () => void
}

interface IUserAccountMenuProps {
	anchorElUser: HTMLElement | null
	handleCloseUserMenu: () => void
	clearToken: () => void
}

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
	"& .MuiBadge-badge": {
		right: 3,
		bottom: 27,
	},
}))

const LanguageSwitch = styled(Switch)(({ theme }) => ({
	"& .MuiSwitch-switchBase": {
		"&.Mui-checked": {
			"& .MuiSwitch-thumb": {
				backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg")`,
				backgroundSize: "20px 20px",
				borderRadius: "50%",
			},
			"& + .MuiSwitch-track": {
				opacity: 1,
				backgroundColor: theme.palette.mode === "dark" ? "#aab4be" : "#aab4be",
			},
		},
	},
	"& .MuiSwitch-thumb": {
		backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg")`,
		backgroundPosition: "center",
		backgroundSize: "40px 40px",
	},
}))

export const drawerWidth = 250
const settings = ["Logout"]

const NavMenuList = (props: INavMenuListProps): JSX.Element => {
	const { handleCloseMobileDrawer, navList, navigate } = props
	const handleClick = (path: string) => {
		handleCloseMobileDrawer()
		navigate(`/${path}`)
	}
	return (
		<List>
			{navList.map((navItem: NavListItem) => {
				// if (!navItem.roles.includes(role as AccountRole)) return
				// const navText = currLang === "th" ? navItem.name.th : navItem.name.en
				// const processedURL = navKeys.toLowerCase()
				const navText = navItem.name
				const navKeys = removeWhiteSpaces(navItem.name)
				const processedURL = navKeys.toLowerCase()

				return (
					<Link
						key={`${navKeys}`}
						onClick={() => handleClick(processedURL)}
						underline="none"
						sx={{
							backgroundColor: "#272976",
							color: "#FFFFFF",
						}}>
						<ListItem key={navKeys} disablePadding>
							<ListItemButton>
								<ListItemIcon sx={{ color: "#FFFFFF" }}>
									{navItem.icon}
								</ListItemIcon>
								<ListItemText primary={navText} />
							</ListItemButton>
						</ListItem>
					</Link>
				)
			})}
		</List>
	)
}

const UserAccountMenu = (props: IUserAccountMenuProps): JSX.Element => {
	const { anchorElUser, clearToken, handleCloseUserMenu } = props
	const { user } = useContext(AuthContext)
	return (
		<Menu
			sx={{
				mt: "45px",
				"& .MuiPaper-root": {
					width: "225px",
				},
			}}
			id="menu-appbar"
			anchorEl={anchorElUser}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={Boolean(anchorElUser)}
			onClose={handleCloseUserMenu}>
			<Box sx={{ padding: "5px 20px 0 15px" }}>
				<Typography>{`Username: ${user?.username}`}</Typography>
				<Typography>{`Role: ${user?.role}`}</Typography>
			</Box>
			<Divider sx={{ margin: "10px 0" }} />
			<MenuItem key={"logout"} onClick={clearToken}>
				<Grid container columnSpacing={2}>
					<Grid item>
						<LogoutIcon />
					</Grid>
					<Grid item>
						<Typography textAlign="center">Logout</Typography>
					</Grid>
				</Grid>
			</MenuItem>
		</Menu>
	)
}

const NavBar = (): JSX.Element => {
	// const { isDarkMode, setIsDarkMode } = props
	const isScreenSmall = useMediaQuery("(max-width:600px)")
	const navigate = useNavigate()
	const [toggleMobileNavBar, setToggleMobileNavBar] = useState<boolean>(false)
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
	const [lang, setLang] = useState<boolean>(false)
	// localStorage.setItem(
	// 	"token",
	// 	JSON.stringify({ username: "admin", role: "admin" })
	// )
	const authContext = useContext(AuthContext)
	console.log(authContext.user)
	// const token = authContext.token
	// const user = authContext.user
	const trigger = useScrollTrigger({ target: document.body, threshold: 0 })
	// const langContext = useContext(LangContext)
	// const currLang = langContext.lang
	// const updateLang = langContext.updateLang

	// const testify = { production: "stuff", otherStuff: 51 }
	// localStorage.setItem("test", JSON.stringify(testify))
	// console.log(localStorage.getItem("test"))
	// const testes = JSON.parse(localStorage.getItem("test") || "")
	// console.log(testes)
	// console.log(testes.production, testes.otherStuff)

	const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setLang(event.target.checked)
			console.log("This doesn't do anything")
		} else {
			setLang(event.target.checked)
			console.log("This also doesn't do anything")
		}
	}

	const clearToken = () => {
		localStorage.removeItem("token")
		navigate("/login", { replace: true })
		window.location.reload()
	}
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}
	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}
	// const stringToColor = (string: string) => {
	//   let hash = 0
	//   let i

	//   for (i = 0; i < string?.length; i += 1) {
	//     hash = string.charCodeAt(i) + ((hash << 5) - hash)
	//   }

	//   let color = "#"

	//   for (i = 0; i < 3; i += 1) {
	//     const value = (hash >> (i * 8)) & 0xff
	//     color += `00${value.toString(16)}`.slice(-2)
	//   }

	//   return color
	// }

	// const stringAvatar = (name: string) => {
	//   return {
	//     sx: {
	//       bgcolor: stringToColor(name)
	//     },
	//     children: `${name?.split(" ")[0][0]}`.toUpperCase()
	//   }
	// }

	// const [width, setWidth] = useState(window.innerWidth)
	// const updateDimensions = () => {
	// 	setWidth(window.innerWidth)
	// }

	// useEffect(() => {
	// 	window.addEventListener("resize", updateDimensions)
	// 	return () => window.removeEventListener("resize", updateDimensions)
	// }, [])

	const handleOpenMobileDrawer = () => {
		setToggleMobileNavBar(true)
	}

	const handleCloseMobileDrawer = () => {
		setToggleMobileNavBar(false)
	}

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return
			}

			setToggleMobileNavBar(open)
		}

	const navDrawerList: JSX.Element = useMemo(() => {
		return (
			<NavMenuList
				navList={navMainList}
				navigate={navigate}
				handleCloseMobileDrawer={handleCloseMobileDrawer}
			/>
		)
	}, [navigate])

	const profileMenu: JSX.Element = useMemo(() => {
		return (
			<UserAccountMenu
				anchorElUser={anchorElUser}
				clearToken={clearToken}
				handleCloseUserMenu={handleCloseUserMenu}
			/>
		)
	}, [settings, anchorElUser])

	return (
		<Box
			component="div"
			id="nav"
			// style={!token ? { display: "none" } : {}}
		>
			<Slide appear={false} direction="down" in={!trigger}>
				<AppBar
					position="fixed"
					sx={{
						width: { xs: "100vw", lg: `calc(100% - ${drawerWidth}px)` },
						backgroundColor: "transparent",
						boxShadow: "none",
						color: "#272976",
					}}>
					<Toolbar>
						<Grid
							container
							// sx={{ display: { xs: "none", md: "flex" } }}
							justifyContent="center"
							alignItems="center"
							spacing={2}>
							<Grid
								container
								item
								xs={3}
								md={7}
								justifyContent="flex-start"
								spacing={2}>
								<Grid
									item
									sx={{
										display: { xs: "none", md: "flex" },
									}}>
									<Typography
										variant="h5"
										noWrap
										component="a"
										href=""
										sx={{
											mr: 2,
											// display: { xs: "none", md: "flex" },
											flexGrow: 1,
											fontFamily: "monospace",
											fontWeight: 700,
											letterSpacing: ".15rem",
											color: "#272976",
											textDecoration: "none",
										}}>
										Cool Website
									</Typography>
								</Grid>
							</Grid>
							<Grid
								container
								item
								xs={9}
								md={5}
								spacing={2}
								alignItems="center"
								justifyContent="flex-end">
								<Grid item>
									<LanguageSwitch
										checked={lang}
										onChange={handleLanguageChange}
									/>
								</Grid>
								<Grid item justifySelf="flex-end">
									<Button
										// onClick={handleClickNotification}
										// size="small"
										// sx={{ ml: 2 }}
										// aria-controls={openIcon ? "notifications-list" : undefined}
										// aria-haspopup="true"
										// aria-expanded={openIcon ? "true" : undefined}
										onClick={() => alert("notified!")}>
										<StyledBadge
											// badgeContent={unRead}
											badgeContent={555}
											color="error"
											max={999}
											anchorOrigin={{
												vertical: "bottom",
												horizontal: "right",
											}}>
											<NotificationsIcon />
										</StyledBadge>
									</Button>
								</Grid>
								<Grid item justifySelf="flex-end">
									<Box sx={{ flexGrow: 0 }}>
										<Tooltip title="">
											<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
												<Avatar
												// {...stringAvatar(
												// 	user?.username ? user.username : "G"
												// )}
												/>
											</IconButton>
										</Tooltip>
									</Box>
								</Grid>
								<Grid item sx={{ display: { xs: "flex", lg: "none" } }}>
									<IconButton
										size="large"
										aria-label="mobile-menu"
										aria-controls="menu-appbar"
										aria-haspopup="true"
										onClick={handleOpenMobileDrawer}
										color="inherit">
										<MenuIcon />
									</IconButton>
								</Grid>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</Slide>
			{toggleMobileNavBar ? (
				<NavBarMobile
					anchor={isScreenSmall ? "top" : "right"}
					toggleDrawer={toggleDrawer}
					toggleMobileNavBar={toggleMobileNavBar}
					navDrawerList={navDrawerList}
				/>
			) : (
				<Drawer
					variant="permanent"
					sx={{
						width: drawerWidth,
						flexShrink: 0,

						"& .MuiDrawer-paper": {
							width: drawerWidth,
							boxSizing: "border-box",
							scrollbarWidth: "thin",
							backgroundColor: "#272976",
							color: "#FFFFFF",
						},
						display: { xs: "none", lg: "flex" },
					}}>
					<Box
						sx={{
							display: "flex",
							justifySelf: "center",
							marginTop: "27px",
							marginBottom: "27px",
						}}>
						<Grid container item justifyContent="center">
							<TheaterComedyIcon
								sx={{ width: "150px", height: "150px", color: "orange" }}
							/>
						</Grid>
					</Box>
					{navDrawerList}
				</Drawer>
			)}
			{profileMenu}
		</Box>
	)
}

export default NavBar
