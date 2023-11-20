import { Drawer } from "@mui/material"

interface INavBarMobileProps {
  anchor: "top" | "right"
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void
  toggleMobileNavBar: boolean
  navDrawerList: JSX.Element
}

const NavBarMobile = (props: INavBarMobileProps): JSX.Element => {
  const { anchor, toggleDrawer, toggleMobileNavBar, navDrawerList } = props
  return (
    <Drawer
      anchor={anchor}
      onClose={toggleDrawer(false)}
      open={toggleMobileNavBar}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#272976",
          color: "#FFFFFF"
        }
      }}
    >
      {navDrawerList}
    </Drawer>
  )
}

export default NavBarMobile
