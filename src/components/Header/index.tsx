import style from "./Header.module.scss"
import {NavLink, useHistory} from "react-router-dom"
import React from "react"
import {useAppDispatch} from "../../hooks/redux"
import {setIsOutLogin} from "../../redux/auth-reducer"
import {IPhotosUser} from "../../type/interface";
import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import {AccountCircle} from "@mui/icons-material"

interface HeaderProps {
    login: null | string
    photos: IPhotosUser | undefined
}


export const Header: React.FC<HeaderProps> = ({login, photos}) => {
    const dispatch = useAppDispatch()
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const onIsOutLogin = () => {
        dispatch(setIsOutLogin())
    }

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleEditProfile = () => {
        history.push("/profile/edit")
        setAnchorEl(null)
    }

    
    const handleClose = () => {
        onIsOutLogin()
        setAnchorEl(null)
    }

    return (
        <>
            {/*<Box sx={{flexGrow: 1}}>*/}
            {/*    <AppBar position="static" enableColorOnDark={true}>*/}
            {/*        <Container maxWidth={"xl"}>*/}
            {/*            <Toolbar>*/}
            {/*                <IconButton*/}
            {/*                    size="large"*/}
            {/*                    edge="start"*/}
            {/*                    color="inherit"*/}
            {/*                    aria-label="menu"*/}
            {/*                    sx={{mr: 2}}*/}
            {/*                >*/}
            {/*                    <MenuIcon/>*/}
            {/*                </IconButton>*/}
            {/*                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>*/}
            {/*                    <NavLink to={"/profile"}>*/}
            {/*                        ??????????????*/}
            {/*                    </NavLink>*/}
            {/*                </Typography>*/}
            {/*                <Typography variant="h6" component="div" sx={{flexGrow: 8}}>*/}
            {/*                    <NavLink to={"/users"}>*/}
            {/*                        ????????????????????????*/}
            {/*                    </NavLink>*/}
            {/*                </Typography>*/}
            {/*                {login ? (*/}
            {/*                    <div>*/}
            {/*                        <IconButton*/}
            {/*                            size="large"*/}
            {/*                            aria-label="account of current user"*/}
            {/*                            aria-controls="menu-appbar"*/}
            {/*                            aria-haspopup="true"*/}
            {/*                            onClick={handleMenu}*/}
            {/*                            color="inherit"*/}
            {/*                        >*/}
            {/*                            <AccountCircle />*/}
            {/*                        </IconButton>*/}
            {/*                        <Menu*/}
            {/*                            id="menu-appbar"*/}
            {/*                            anchorEl={anchorEl}*/}
            {/*                            anchorOrigin={{*/}
            {/*                                vertical: 'top',*/}
            {/*                                horizontal: 'right',*/}
            {/*                            }}*/}
            {/*                            keepMounted*/}
            {/*                            transformOrigin={{*/}
            {/*                                vertical: 'top',*/}
            {/*                                horizontal: 'right',*/}
            {/*                            }}*/}
            {/*                            open={Boolean(anchorEl)}*/}
            {/*                            onClose={handleClose}*/}
            {/*                        >*/}
            {/*                            <MenuItem component={"button"} onClick={handleEditProfile}>?????????????????????????? ??????????????</MenuItem>*/}
            {/*                            <MenuItem onClick={handleClose}>??????????</MenuItem>*/}
            {/*                        </Menu>*/}
            {/*                    </div>*/}
            {/*                )*/}
            {/*                : (<Button color="inherit">Login</Button>)*/}
            {/*                }*/}
            {/*            </Toolbar>*/}
            {/*        </Container>*/}
            {/*    </AppBar>*/}
            {/*</Box>*/}
            <div className={style.header}>
                <NavLink to={"/"}>
                    <div className={style.header__logo}>
                        <img src={"images/logo_header.png"} alt="logo_header"/>
                    </div>
                </NavLink>
                <div className={style.nav}>
                    <NavLink to={"/profile"}>
                        <h3>??????????????</h3>
                    </NavLink>
                </div>
                <div className={style.nav}>
                    <NavLink to={"/users"}>
                        <h3>????????????????????????</h3>
                    </NavLink>
                </div>
                <div className={style.search}>
                    <img src="images/search.svg" alt=""/>
                    <input type="text"/>
                </div>
                <div className={style.login}>
                    {photos?.small ? <img className={style.img_logo} src={photos.small} alt="logo"/> :
                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                            <path id="User_Circle" data-name="User Circle"
                                  d="M12.5,25A12.5,12.5,0,1,1,25,12.5,12.51,12.51,0,0,1,12.5,25ZM4.75,21a11.48,11.48,0,0,0,15.5,0c-.69-1.58-2.71-2.42-4.34-3.09S14,16.3,14,15.5a3,3,0,0,1,.93-2.12,3.41,3.41,0,0,0,1.14-2.64A3.51,3.51,0,0,0,12.5,7,3.44,3.44,0,0,0,9,10.74a3.35,3.35,0,0,0,1.08,2.64A3,3,0,0,1,11,15.5c0,.8-.22,1.7-1.84,2.36S5.44,19.41,4.75,21ZM12.5,6a4.5,4.5,0,0,1,4.57,4.74,4.38,4.38,0,0,1-1.48,3.39A2,2,0,0,0,15,15.5c0,.44,0,.94,1.21,1.44,1.68.7,3.82,1.59,4.78,3.31a11.5,11.5,0,1,0-17,0C5,18.53,7.1,17.64,8.7,17,10,16.44,10,15.92,10,15.5a2,2,0,0,0-.56-1.37A4.36,4.36,0,0,1,8,10.74,4.41,4.41,0,0,1,12.5,6Z"/>
                        </svg>}
                    {login ? <div onClick={onIsOutLogin} className={style.login__out}>
                            <span title={"??????????"} className={style.login__me}>{login}</span></div> :
                        <div className={style.login__btn}><NavLink to={"/login"}>
                            <button>Login</button>
                        </NavLink></div>}
                </div>
            </div>
        </>
    )
}